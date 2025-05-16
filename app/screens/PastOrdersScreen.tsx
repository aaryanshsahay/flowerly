import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dummy data for past orders
const PAST_ORDERS = [
  {
    id: '1',
    date: 'March 15, 2024',
    status: 'Delivered',
    items: [
      {
        id: '1',
        name: 'Blushing Bloom',
        price: '$25',
        quantity: 2,
        image: require('../../assets/images/bouquet1.jpg'),
      },
      {
        id: '2',
        name: 'Enchanted Petals',
        price: '$30',
        quantity: 1,
        image: require('../../assets/images/bouquet2.jpg'),
      },
    ],
    totalAmount: '$80',
    deliveryAddress: {
      nickname: 'Home',
      address: '123 Flower Street, Apt 4B',
      city: 'New York, NY 10001',
    },
  },
  {
    id: '2',
    date: 'March 10, 2024',
    status: 'Delivered',
    items: [
      {
        id: '3',
        name: 'Sunset Embrace',
        price: '$20',
        quantity: 1,
        image: require('../../assets/images/bouquet3.jpg'),
      },
    ],
    totalAmount: '$20',
    deliveryAddress: {
      nickname: 'Office',
      address: '456 Bloom Avenue, Suite 200',
      city: 'New York, NY 10002',
    },
  },
  {
    id: '3',
    date: 'March 5, 2024',
    status: 'Delivered',
    items: [
      {
        id: '4',
        name: 'Petal Whisper',
        price: '$35',
        quantity: 3,
        image: require('../../assets/images/bouquet4.jpg'),
      },
    ],
    totalAmount: '$105',
    deliveryAddress: {
      nickname: 'Home',
      address: '123 Flower Street, Apt 4B',
      city: 'New York, NY 10001',
    },
  },
];

export default function PastOrdersScreen() {
  const handleOrderDetails = (orderId: string) => {
    // TODO: Navigate to order details screen
    console.log('View order details:', orderId);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-sharp" size={25} color="#fff" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.heading}>Past Orders</Text>

        <ScrollView style={styles.ordersList} contentContainerStyle={styles.ordersListContent}>
          {PAST_ORDERS.map((order) => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() => handleOrderDetails(order.id)}
            >
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderDate}>{order.date}</Text>
                  <View style={styles.statusContainer}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>{order.status}</Text>
                  </View>
                </View>
                <Text style={styles.orderTotal}>{order.totalAmount}</Text>
              </View>

              <View style={styles.itemsContainer}>
                {order.items.map((item) => (
                  <View key={item.id} style={styles.orderItem}>
                    <Image source={item.image} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                      <Text style={styles.itemPrice}>{item.price}</Text>
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.deliveryInfo}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <View style={styles.addressContainer}>
                  <Text style={styles.addressNickname}>{order.deliveryAddress.nickname}</Text>
                  <Text style={styles.addressText}>{order.deliveryAddress.address}</Text>
                  <Text style={styles.addressText}>{order.deliveryAddress.city}</Text>
                </View>
              </View>

              <View style={styles.viewDetailsContainer}>
                <Text style={styles.viewDetailsText}>View Order Details</Text>
                <Ionicons name="chevron-forward" size={20} color="#9C8CF9" />
              </View>
            </TouchableOpacity>
          ))}
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
  ordersList: {
    flex: 1,
  },
  ordersListContent: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#F7F5FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#9C8CF9',
  },
  itemsContainer: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9C8CF9',
  },
  deliveryInfo: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
  },
  addressContainer: {
    marginLeft: 8,
    flex: 1,
  },
  addressNickname: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  viewDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0DFF5',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9C8CF9',
    marginRight: 4,
  },
}); 