import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAddresses } from '../context/AddressContext';

export default function AddAddressScreen() {
  const { addAddress } = useAddresses();
  const [formData, setFormData] = useState({
    nickname: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleSubmit = () => {
    // Basic validation
    if (!formData.nickname || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      // In a real app, show an error message to the user
      console.log('Please fill in all required fields');
      return;
    }

    addAddress(formData);
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-sharp" size={25} color="#fff" />
      </TouchableOpacity>

      <ScrollView style={styles.card}>
        <Text style={styles.heading}>Add New Address</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nickname (e.g., Home, Office)</Text>
            <TextInput
              style={styles.input}
              value={formData.nickname}
              onChangeText={(text) => setFormData({ ...formData, nickname: text })}
              placeholder="Enter nickname"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Street Address</Text>
            <TextInput
              style={styles.input}
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
              placeholder="Enter street address"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Apartment, Suite, etc. (optional)</Text>
            <TextInput
              style={styles.input}
              value={formData.apartment}
              onChangeText={(text) => setFormData({ ...formData, apartment: text })}
              placeholder="Enter apartment or suite number"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              value={formData.city}
              onChangeText={(text) => setFormData({ ...formData, city: text })}
              placeholder="Enter city"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>State</Text>
              <TextInput
                style={styles.input}
                value={formData.state}
                onChangeText={(text) => setFormData({ ...formData, state: text })}
                placeholder="State"
                placeholderTextColor="#999"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>ZIP Code</Text>
              <TextInput
                style={styles.input}
                value={formData.zipCode}
                onChangeText={(text) => setFormData({ ...formData, zipCode: text })}
                placeholder="ZIP"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
    paddingTop: 40,
    paddingHorizontal: 20,
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
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F7F5FF',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#9C8CF9',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 