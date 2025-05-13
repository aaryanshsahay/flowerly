import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const flowerDetails = {
    1: {
      name: 'Blushing Bloom',
      description: 'A beautiful bouquet of vibrant tulips.',
      price: '$25',
      image: require('../../assets/images/bouquet1.jpg'),
      extraImages: [
        require('../../assets/images/bouquet10.jpg'),
        require('../../assets/images/bouquet11.jpg'),
        require('../../assets/images/bouquet12.jpg'),
      ],
      contents: {
        main: [
          { name: 'Rose', quantity: 2, type: 'flower' },
          { name: 'Seven Seas', quantity: 3, type: 'flower' },
          { name: 'Lily', quantity: 4, type: 'flower' },
        ],
        background: [
          { name: "Baby's Breath", type: 'background' },
          { name: 'Leaves', type: 'background' },
        ],
      },
    },
    2: {
      name: 'Enchanted Petals',
      description: 'Elegant roses in a stunning arrangement.',
      price: '$30',
      image: require('../../assets/images/bouquet2.jpg'),
      extraImages: [
        require('../../assets/images/bouquet10.jpg'),
        require('../../assets/images/bouquet11.jpg'),
        require('../../assets/images/bouquet12.jpg'),
      ],
      contents: {
        main: [
          { name: 'Rose', quantity: 5, type: 'flower' },
          { name: 'Orchid', quantity: 2, type: 'flower' },
        ],
        background: [
          { name: 'Eucalyptus', type: 'background' },
          { name: "Baby's Breath", type: 'background' },
        ],
      },
    },
    3: {
      name: 'Sunset Embrace',
      description: 'Fresh daisies for any occasion.',
      price: '$20',
      image: require('../../assets/images/bouquet3.jpg'),
      extraImages: [
        require('../../assets/images/bouquet10.jpg'),
        require('../../assets/images/bouquet11.jpg'),
        require('../../assets/images/bouquet12.jpg'),
      ],
      contents: {
        main: [
          { name: 'Daisy', quantity: 6, type: 'flower' },
          { name: 'Carnation', quantity: 2, type: 'flower' },
        ],
        background: [{ name: 'Leaves', type: 'background' }],
      },
    },
    4: {
      name: 'Petal Whisper',
      description: 'Gorgeous lilies arranged perfectly.',
      price: '$35',
      image: require('../../assets/images/bouquet4.jpg'),
      extraImages: [
        require('../../assets/images/bouquet10.jpg'),
        require('../../assets/images/bouquet11.jpg'),
        require('../../assets/images/bouquet12.jpg'),
      ],
      contents: {
        main: [
          { name: 'Lily', quantity: 5, type: 'flower' },
          { name: 'Tulip', quantity: 3, type: 'flower' },
        ],
        background: [
          { name: 'Fern', type: 'background' },
          { name: "Baby's Breath", type: 'background' },
        ],
      },
    },
  };

  const flower = flowerDetails[id];

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
        <Text style={styles.name}>{flower.name}</Text>

        <View style={styles.imageContainer}>
          <Image source={flower.image} style={styles.largeImage} />
          <View style={styles.smallImagesColumn}>
            {flower.extraImages.map((img, index) => (
              <Image key={index} source={img} style={styles.smallImage} />
            ))}
          </View>
        </View>

        <Text style={styles.description}>{flower.description}</Text>
        <Text style={styles.price}>{flower.price}</Text>

        {/* "This bouquet contains:" Text */}
        <Text style={styles.containsText}>This bouquet contains:</Text>

        {/* ScrollView for contents */}
        <ScrollView style={styles.scrollContainer}>
          {/* Flower Contents */}
          {flower.contents?.main.map((item, index) => (
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
          {flower.contents?.background.map((item, index) => (
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

      {/* Add to Cart */}
      <Pressable
        onPress={() => console.log('Added to cart')}
        style={({ pressed }) => [
          styles.cartButton,
          pressed && styles.cartButtonPressed,
        ]}
      >
        <Ionicons name="cart-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.cartButtonText}>Add to Cart</Text>
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
    paddingLeft: 15,
    borderLeftWidth: 1,
    borderLeftColor: '#D3D3D3',
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
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  cartButtonPressed: {
    backgroundColor: '#6D5DF6', // Darker purple on press
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
