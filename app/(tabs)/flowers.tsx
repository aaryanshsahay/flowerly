import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BouquetScreen() {
  const handleLogout = () => {
    // Navigate back to login screen
    router.replace('/');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.heading}>Your Account</Text>

      {/* Card 1: Your Information */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Information</Text>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Your Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Your Saved Address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Your Past Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Your Likes</Text>
        </TouchableOpacity>
      </View>

      {/* Card 2: General */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>General</Text>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={handleLogout}>
          <Text style={[styles.rowText, { color: '#ff4d4d' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
    padding: 20,
    paddingTop: 100,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#9C8CF9',
    marginBottom: 12,
  },
  row: {
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  rowText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
