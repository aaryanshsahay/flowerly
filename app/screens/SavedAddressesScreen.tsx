import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAddresses } from '../context/AddressContext';
import { useDelivery } from '../context/DeliveryContext';

// Dummy data for saved addresses
const SAVED_ADDRESSES = [
  {
    id: '1',
    nickname: 'Home',
    address: '123 Flower Street',
    apartment: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    isDefault: true,
  },
  {
    id: '2',
    nickname: 'Office',
    address: '456 Bloom Avenue',
    apartment: 'Suite 200',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    isDefault: false,
  },
];

export default function SavedAddressesScreen() {
  const { addresses, removeAddress, setDefaultAddress } = useAddresses();
  const { selectedAddressId, setSelectedAddressId } = useDelivery();

  const handleAddAddress = () => {
    router.push('/screens/AddAddressScreen');
  };

  const handleRemoveAddress = (id: string) => {
    Alert.alert(
      'Remove Address',
      'Are you sure you want to remove this address?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => removeAddress(id),
          style: 'destructive',
        },
      ]
    );
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddress(id);
    setSelectedAddressId(id);
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-sharp" size={25} color="#fff" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.heading}>Saved Addresses</Text>

        <ScrollView style={styles.addressList} contentContainerStyle={styles.addressListContent}>
          {addresses.map((address) => (
            <TouchableOpacity
              key={address.id}
              style={[
                styles.addressCard,
                selectedAddressId === address.id && styles.selectedAddressCard
              ]}
              onPress={() => handleSelectAddress(address.id)}
            >
              <View style={styles.addressHeader}>
                <View style={styles.nicknameContainer}>
                  <Ionicons 
                    name={selectedAddressId === address.id ? "checkmark-circle" : "location"} 
                    size={20} 
                    color={selectedAddressId === address.id ? "#4CAF50" : "#9C8CF9"} 
                  />
                  <Text style={styles.nickname}>{address.nickname}</Text>
                  {address.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveAddress(address.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </View>

              <View style={styles.addressDetails}>
                <Text style={styles.addressText}>{address.address}</Text>
                {address.apartment && (
                  <Text style={styles.addressText}>{address.apartment}</Text>
                )}
                <Text style={styles.addressText}>
                  {address.city}, {address.state} {address.zipCode}
                </Text>
              </View>

              {!address.isDefault && (
                <TouchableOpacity
                  style={styles.setDefaultButton}
                  onPress={() => handleSetDefault(address.id)}
                >
                  <Text style={styles.setDefaultText}>Set as Default</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}

          {/* Add New Address Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
            <Ionicons name="add-circle-outline" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Add New Address</Text>
          </TouchableOpacity>
        </ScrollView>
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
    flex: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  addressList: {
    flex: 1,
  },
  addressListContent: {
    paddingBottom: 20,
  },
  addressCard: {
    backgroundColor: '#F7F5FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nicknameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nickname: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  defaultBadge: {
    backgroundColor: '#9C8CF9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  defaultText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  removeButton: {
    padding: 4,
  },
  addressDetails: {
    marginBottom: 12,
  },
  addressText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  setDefaultButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F0EEFF',
  },
  setDefaultText: {
    color: '#9C8CF9',
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9C8CF9',
    padding: 16,
    borderRadius: 12,
    marginTop: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  selectedAddressCard: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
}); 