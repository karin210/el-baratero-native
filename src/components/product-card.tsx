import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { Product } from '@/types/product';

type ProductCardProps = {
  product: Product;
};

const formatPrice = (value: number): string => `$${value.toFixed(2)}`;

export function ProductCard({ product }: ProductCardProps): React.JSX.Element {
  const { name, category, price, originalPrice } = product;

  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.imageWrapper} />

      <View style={styles.info}>
        <ThemedText type="small" themeColor="textSecondary">
          {category}
        </ThemedText>
        <ThemedText type="smallBold" numberOfLines={2}>
          {name}
        </ThemedText>
        <View style={styles.prices}>
          <ThemedText type="smallBold">{formatPrice(price)}</ThemedText>
          {originalPrice !== undefined && (
            <ThemedText type="small" themeColor="textSecondary" style={styles.originalPrice}>
              {formatPrice(originalPrice)}
            </ThemedText>
          )}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  imageWrapper: {
    aspectRatio: 3 / 4,
  },
  info: {
    gap: Spacing.one,
    padding: Spacing.two,
  },
  prices: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
  },
});
