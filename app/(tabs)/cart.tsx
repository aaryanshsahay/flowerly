import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';
import { useDelivery } from '../context/DeliveryContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CartScreen() {
  const { items, removeFromCart, updateQuantity } = useCart();
  const { selectedAddress } = useDelivery();

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price.replace('$', '')),
    0
  );

  const deliveryCharge = 4.99;
  const tax = 0.05 * subtotal;
  const total = subtotal + deliveryCharge + tax;

  const handleChangeAddress = () => {
    router.push('/screens/SavedAddressesScreen');
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="cart-outline" size={64} color="#9C8CF9" />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Text style={styles.emptySubtext}>Add some beautiful flowers to get started!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Cart</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <TouchableOpacity
              onPress={() => removeFromCart(item.id)}
              style={styles.removeButton}
            >
              <MaterialCommunityIcons name="delete-outline" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        {/* Delivery Address Section */}
        <TouchableOpacity style={styles.addressContainer} onPress={handleChangeAddress}>
          <MaterialCommunityIcons name="map-marker" size={24} color="#9C8CF9" />
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressLabel}>Deliver to:</Text>
            {selectedAddress ? (
              <>
                <Text style={styles.addressValue}>
                  {selectedAddress.nickname} • {selectedAddress.address}
                </Text>
                <Text style={styles.addressValue}>
                  {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
                </Text>
              </>
            ) : (
              <Text style={styles.addressValue}>Select a delivery address</Text>
            )}
          </View>
          <TouchableOpacity style={styles.changeButton} onPress={handleChangeAddress}>
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Price Breakdown */}
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Price for Flowers</Text>
          <Text style={styles.breakdownValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Delivery Charges</Text>
          <Text style={styles.breakdownValue}>${deliveryCharge.toFixed(2)}</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Tax & Fees</Text>
          <Text style={styles.breakdownValue}>${tax.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.breakdownRow}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity 
          style={[
            styles.checkoutButton,
            !selectedAddress && styles.checkoutButtonDisabled
          ]}
          disabled={!selectedAddress}
        >
          <Text style={styles.checkoutText}>
            {selectedAddress ? 'Place Order' : 'Select Delivery Address'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
    padding: 20,
    paddingTop: 60,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#F7F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9C8CF9',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 120,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    backgroundColor: '#F0EEFF',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#9C8CF9',
    fontWeight: '600',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#9C8CF9',
  },
  removeButton: {
    padding: 8,
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 110,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F2FE',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  addressTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  addressLabel: {
    fontSize: 14,
    color: '#666',
  },
  addressValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  changeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  changeButtonText: {
    fontSize: 14,
    color: '#9C8CF9',
    fontWeight: '600',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  breakdownLabel: {
    fontSize: 16,
    color: '#666',
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0DFF5',
    marginVertical: 12,
  },
  total: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#9C8CF9',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutButtonDisabled: {
    backgroundColor: '#D1CDF7',
  },
});
