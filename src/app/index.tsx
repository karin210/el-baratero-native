import { StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProductList } from '@/components/product-list';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { products } from '@/data/products';

function HomeHeader(): React.JSX.Element {
  return (
    <ThemedView style={styles.header}>
      <Image
        source={require('@/../../assets/images/cat-logo.svg')}
        style={styles.logo}
      />
      <ThemedView style={styles.headerContent}>
        <ThemedText type="subtitle" role="heading">
          New arrivals
        </ThemedText>
        <ThemedText themeColor="textSecondary">
          Fresh styles for the season, at boutique-friendly prices.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

export default function HomeScreen(): React.JSX.Element {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ProductList products={products} header={<HomeHeader />} />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingBottom: Spacing.two,
  },
  logo: {
    width: 48,
    height: 48,
  },
  headerContent: {
    flex: 1,
    gap: Spacing.one,
  },
});
