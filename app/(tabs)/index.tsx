import { router } from 'expo-router'; // Use expo-router's router
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRODUCTS } from '../data/products';

export default function HomeScreen() {
  const featuredProducts = PRODUCTS.filter(product => product.isFeatured);

  const handleViewAll = () => {
    router.push('/bouquet'); // Navigate to bouquet tab
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.background}>
        <MaterialCommunityIcons
          name="flower-tulip-outline"
          size={40}
          color="#fff"
          style={styles.icon}
        />

        <Text style={styles.heading}>Beautiful Flowers, Delivered</Text>
        <Text style={styles.subtext}>
          Create custom bouquets or choose from our expertly designed arrangements
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.filledButton}>
            <Text style={styles.filledButtonText}>Build a Bouquet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>Shop Bouquets</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.featuredContainer}>
        <Text style={styles.featuredText}>Featured Bouquets</Text>
        <TouchableOpacity onPress={handleViewAll}>
          <Text style={styles.viewAllText}>View All </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {featuredProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.card}
            onPress={() => router.push(`/details/${product.id}`)}
          >
            <Image source={product.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{product.name}</Text>
            <Text style={styles.cardDescription}>{product.description}</Text>
            <Text style={styles.cardPrice}>{product.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
    padding: 20,
    paddingTop: 60,
  },
  background: {
    backgroundColor: '#9C8CF9',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  icon: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtext: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  filledButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  filledButtonText: {
    color: '#9C8CF9',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    borderColor: '#fff',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  outlineButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  featuredContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  featuredText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
  },
  viewAllText: {
    fontSize: 16,
    color: '#9C8CF9',
    fontWeight: '600',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#9C8CF9',
  },
});
