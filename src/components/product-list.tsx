import { FlatList, StyleSheet, View } from 'react-native';

import { ProductCard } from '@/components/product-card';
import { Spacing } from '@/constants/theme';
import type { Product } from '@/types/product';

type ProductListProps = {
  products: Product[];
  header?: React.ReactElement;
};

export function ProductList({ products, header }: ProductListProps): React.JSX.Element {
  return (
    <FlatList
      role="list"
      data={products}
      keyExtractor={(product) => product.id}
      numColumns={2}
      ListHeaderComponent={header}
      contentContainerStyle={styles.content}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <View role="listitem" style={styles.item}>
          <ProductCard product={item} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.three,
    padding: Spacing.three,
  },
  row: {
    gap: Spacing.three,
  },
  item: {
    flex: 1,
  },
});
