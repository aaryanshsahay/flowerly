import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { addToCart, items } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const product = PRODUCTS.find(p => p.id === Number(id));
  const isInCart = items.some(item => item.id === id.toString());

  if (!product) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 18, color: '#666' }}>Product not found</Text>
      </View>
    );
  }

  const handleCartAction = async () => {
    if (isInCart) {
      router.push('/cart');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 250)); // Loading animation
    
    addToCart({
      id: id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    await new Promise(resolve => setTimeout(resolve, 250)); // Show success state
    setIsLoading(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-sharp" size={25} color="#fff" />
      </TouchableOpacity>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.name}>{product.name}</Text>

        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.largeImage} />
          <View style={styles.smallImagesColumn}>
            {product.extraImages?.map((img, index) => (
              <Image key={index} source={img} style={styles.smallImage} />
            ))}
          </View>
        </View>

        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>{product.price}</Text>

        {/* "This bouquet contains:" Text */}
        <Text style={styles.containsText}>This bouquet contains:</Text>

        {/* ScrollView for contents */}
        <ScrollView style={styles.scrollContainer}>
          {/* Flower Contents */}
          {product.contents?.main.map((item, index) => (
            <View key={`main-${index}`} style={styles.contentBlock}>
              <View style={styles.contentLeft}>
                <Ionicons
                  name={item.type === 'flower' ? 'flower' : 'leaf'}
                  size={24}
                  color={item.type === 'flower' ? '#FF61A6' : '#6D9D30'}
                />
              </View>
              <View style={styles.contentRight}>
                <Text style={styles.contentText}>
                  {item.quantity} x {item.name}
                </Text>
              </View>
            </View>
          ))}

          {/* Background Contents */}
          {product.contents?.background.map((item, index) => (
            <View key={`bg-${index}`} style={styles.contentBlock}>
              <View style={styles.contentLeft}>
                <Ionicons
                  name={item.type === 'background' ? 'leaf' : 'flower'}
                  size={24}
                  color="#6D9D30"
                />
              </View>
              <View style={styles.contentRight}>
                <Text style={styles.contentText}>{item.name}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Add/Go to Cart Button */}
      <Pressable
        onPress={handleCartAction}
        disabled={isLoading}
        style={({ pressed }) => [
          styles.cartButton,
          pressed && styles.cartButtonPressed,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <>
            <Ionicons 
              name={isInCart ? "cart" : "cart-outline"} 
              size={24} 
              color="#fff" 
              style={{ marginRight: 8 }} 
            />
            <Text style={styles.cartButtonText}>
              {isInCart ? 'Go to Cart' : 'Add to Cart'}
            </Text>
          </>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: '#9C8CF9',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  card: {
    marginTop: 60,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    flex: 1,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'left',
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  largeImage: {
    width: '65%',
    height: 220,
    borderRadius: 16,
    marginRight: 10,
  },
  smallImagesColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  smallImage: {
    width: '100%',
    height: 70,
    borderRadius: 12,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: '#9C8CF9',
    textAlign: 'center',
  },
  containsText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  scrollContainer: {
    marginBottom: 20,
  },
  contentBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAE6FA',
    marginVertical: 5,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  contentLeft: {
    flex: 0.2,
    alignItems: 'center',
  },
  contentRight: {
    flex: 0.8,
  },
  contentText: {
    fontSize: 16,
    color: '#333',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9C8CF9',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  cartButtonPressed: {
    opacity: 0.8,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
