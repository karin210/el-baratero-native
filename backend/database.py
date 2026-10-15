"""PostgreSQL connection handling and table setup (raw SQL, no ORM).

Connection settings are read from environment variables (a `.env` file next
to this module is loaded automatically):

    DATABASE_URL   full libpq URL, e.g. postgresql://user:pass@host:5432/dbname
                   (takes precedence over the individual PG* variables)
    PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD
    PGSSLMODE      defaults to "require", which AWS RDS expects
    DB_POOL_MIN, DB_POOL_MAX   connection pool bounds (default 1 / 10)
"""

import logging
import os
from collections.abc import Iterator
from contextlib import contextmanager
from pathlib import Path

from dotenv import load_dotenv
from psycopg2.extensions import connection as Connection
from psycopg2.extras import RealDictCursor
from psycopg2.pool import ThreadedConnectionPool

load_dotenv(Path(__file__).with_name(".env"))

logger = logging.getLogger(__name__)

CREATE_PRODUCTS_TABLE = """
CREATE TABLE IF NOT EXISTS products (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL CHECK (length(trim(name)) > 0),
    category        TEXT NOT NULL CHECK (length(trim(category)) > 0),
    price           NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    original_price  NUMERIC(10, 2) CHECK (original_price IS NULL OR original_price > price),
    image_url       TEXT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS products_category_idx ON products (category);
"""

_pool: ThreadedConnectionPool | None = None


def _connection_kwargs() -> dict[str, str]:
    sslmode = os.getenv("PGSSLMODE", "require")
    url = os.getenv("DATABASE_URL")
    if url:
        return {"dsn": url, "sslmode": sslmode}

    # psycopg2 reads PGHOST, PGUSER, etc. from the environment on its own;
    # only the values we default explicitly are passed here.
    return {"sslmode": sslmode, "connect_timeout": os.getenv("PGCONNECT_TIMEOUT", "10")}


def init_pool() -> None:
    """Open the shared connection pool. Safe to call more than once."""
    global _pool
    if _pool is not None:
        return
    _pool = ThreadedConnectionPool(
        minconn=int(os.getenv("DB_POOL_MIN", "1")),
        maxconn=int(os.getenv("DB_POOL_MAX", "10")),
        **_connection_kwargs(),
    )
    logger.info("Database connection pool opened")


def close_pool() -> None:
    """Close every pooled connection (call on application shutdown)."""
    global _pool
    if _pool is None:
        return
    _pool.closeall()
    _pool = None
    logger.info("Database connection pool closed")


@contextmanager
def get_connection() -> Iterator[Connection]:
    """Borrow a pooled connection as one transaction.

    Commits when the block finishes, rolls back if it raises, and always
    returns the connection to the pool.
    """
    init_pool()
    assert _pool is not None
    conn = _pool.getconn()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        _pool.putconn(conn)


@contextmanager
def get_cursor() -> Iterator[RealDictCursor]:
    """Cursor inside its own transaction; rows come back as dicts.

    Always pass values as parameters, never format them into the SQL:

        with get_cursor() as cur:
            cur.execute("SELECT * FROM products WHERE id = %s", (product_id,))
            product = cur.fetchone()
    """
    with get_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            yield cur


def create_tables() -> None:
    """Create every table the app needs if it does not exist yet."""
    with get_cursor() as cur:
        cur.execute(CREATE_PRODUCTS_TABLE)
    logger.info("Database tables are ready")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    create_tables()
    close_pool()
