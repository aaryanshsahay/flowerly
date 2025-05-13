import { useNavigation } from '@react-navigation/native'; // Importing useNavigation
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TAGS = ['All', 'Popular', 'Romantic', 'Seasonal', 'Colorful', 'Classic'];

const BOUQUETS = [
  { id: 1, name: 'Blushing Bloom', price: '$25', tag: 'Romantic', image: require('../../assets/images/bouquet1.jpg') },
  { id: 2, name: 'Sunset Embrace', price: '$30', tag: 'Seasonal', image: require('../../assets/images/bouquet2.jpg') },
  { id: 3, name: 'Rosy Affair', price: '$22', tag: 'Classic', image: require('../../assets/images/bouquet3.jpg') },
  { id: 4, name: 'Petal Parade', price: '$28', tag: 'Colorful', image: require('../../assets/images/bouquet4.jpg') },
  { id: 5, name: 'Violet Charm', price: '$35', tag: 'Popular', image: require('../../assets/images/bouquet5.jpg') },
  { id: 6, name: 'Daisy Days', price: '$20', tag: 'Seasonal', image: require('../../assets/images/bouquet6.jpg') },
  { id: 7, name: 'Tulip Touch', price: '$26', tag: 'Romantic', image: require('../../assets/images/bouquet7.jpg') },
  { id: 8, name: 'Lavender Luxe', price: '$32', tag: 'Popular', image: require('../../assets/images/bouquet8.jpg') },
  { id: 9, name: 'Bright Blossoms', price: '$27', tag: 'Colorful', image: require('../../assets/images/bouquet9.jpg') },
  { id: 10, name: 'Rose Harmony', price: '$33', tag: 'Classic', image: require('../../assets/images/bouquet10.jpg') },
  { id: 11, name: 'Pink Whisper', price: '$24', tag: 'Romantic', image: require('../../assets/images/bouquet11.jpg') },
  { id: 12, name: 'Golden Glow', price: '$29', tag: 'Seasonal', image: require('../../assets/images/bouquet12.jpg') },
  { id: 13, name: 'Spring Symphony', price: '$31', tag: 'Colorful', image: require('../../assets/images/bouquet13.jpg') },
  { id: 14, name: 'Ruby Romance', price: '$30', tag: 'Popular', image: require('../../assets/images/bouquet14.jpg') },
  { id: 15, name: 'Lily Elegance', price: '$34', tag: 'Classic', image: require('../../assets/images/bouquet15.jpg') },
  { id: 16, name: 'Charming Charm', price: '$23', tag: 'Colorful', image: require('../../assets/images/bouquet16.jpg') },
  { id: 17, name: 'Midnight Petals', price: '$36', tag: 'Romantic', image: require('../../assets/images/bouquet17.jpg') },
  { id: 18, name: 'Sunshine Surprise', price: '$21', tag: 'Seasonal', image: require('../../assets/images/bouquet18.jpg') },
  { id: 19, name: 'Pastel Dreams', price: '$28', tag: 'Classic', image: require('../../assets/images/bouquet19.jpg') },
  { id: 20, name: 'Fiery Passion', price: '$35', tag: 'Popular', image: require('../../assets/images/bouquet20.jpg') },
];

export default function BouquetScreen() {
  const [selectedTag, setSelectedTag] = useState('All');
  const navigation = useNavigation(); // Accessing navigation

  const filteredBouquets =
    selectedTag === 'All'
      ? BOUQUETS
      : BOUQUETS.filter((item) => item.tag === selectedTag);

  // Function to navigate to the details screen when a bouquet is clicked
  const handlePress = (id: number) => {
    navigation.navigate('DetailsScreen', { id }); // Passing id as a parameter
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop Bouquets</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagContainer}
        style={styles.scrollView}
      >
        {TAGS.map((tag) => (
          <TouchableOpacity
            key={tag}
            onPress={() => setSelectedTag(tag)}
            style={[styles.tag, selectedTag === tag && styles.selectedTag]}
          >
            <Text style={[styles.tagText, selectedTag === tag && styles.selectedTagText]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredBouquets}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item.id)}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
            <View style={styles.cardTag}>
              <Text style={styles.cardTagText}>{item.tag}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  scrollView: {
    maxHeight: 48,
    marginBottom: 16,
  },
  tagContainer: {
    paddingHorizontal: 2,
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  selectedTag: {
    backgroundColor: '#a78bfa',
    borderColor: '#a78bfa',
  },
  tagText: {
    color: '#333',
    fontWeight: '500',
  },
  selectedTagText: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: 130,
    borderRadius: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  cardTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cardTagText: {
    fontSize: 12,
    color: '#555',
  },
});
