import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-sharp" size={25} color="#fff" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.heading}>Profile Details</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>John Doe</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>john.doe@example.com</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>+1 (555) 123-4567</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Date of Birth</Text>
          <Text style={styles.value}>January 1, 1990</Text>
        </View>

        <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>123 Flower Street{'\n'}Apt 4B{'\n'}New York, NY 10001</Text>
        </View>
      </View>
    </View>
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
    top: 60,
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
    marginTop: 80,
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
  infoRow: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 14,
    color: '#9C8CF9',
    marginBottom: 4,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
}); 