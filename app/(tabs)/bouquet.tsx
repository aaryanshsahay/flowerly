import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PRODUCTS } from '../data/products';

const TAGS = ['All', 'Popular', 'Romantic', 'Seasonal', 'Colorful', 'Classic'];

export default function BouquetScreen() {
  const [selectedTag, setSelectedTag] = useState('All');

  const filteredBouquets =
    selectedTag === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((item) => item.tag === selectedTag);

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
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push(`/details/${item.id}`)}
          >
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
