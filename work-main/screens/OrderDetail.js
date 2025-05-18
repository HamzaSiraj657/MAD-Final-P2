import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert} from 'react-native'; 
import { IP } from '../App';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const OrderDetail = ({ route, navigation }) => {
  
  const { order } = route.params;
  const products = typeof order.products === 'string' ? JSON.parse(order.products) : order.products;
  const [status, setStatus] = useState(order.status);

  const updateStatus = async (newStatus) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`${IP}:3000/api/orders/status/${order.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
         Authorization: `Bearer ${token}`,
      });

      if (response.ok) {
        setStatus(newStatus);
        Alert.alert("Updated", `Order status updated to ${newStatus}`);
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to update status.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not update status.");
    }
  };

  const deleteOrder = async () => {
    const token = await AsyncStorage.getItem('token');
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this order?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${IP}:3000/api/orders/${order.id}`, {
                method: 'DELETE',
                 Authorization: `Bearer ${token}`,
              });
              if (response.ok) {
                Alert.alert("Deleted", "Order deleted.");
                navigation.goBack();
              } else {
                Alert.alert("Error", "Failed to delete order.");
              }
            } catch (err) {
              console.error(err);
              Alert.alert("Error", "Could not delete order.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order #{order.id}</Text>
      <Text>Date: {order.order_date} at {order.order_time}</Text>
      <Text>Status: {status}</Text>

      <Text style={styles.sectionTitle}>Customer Info:</Text>
      <Text>Name: {order.name}</Text>
      <Text>Address: {order.address}</Text>
      <Text>Phone: {order.phone}</Text>

      <Text style={styles.sectionTitle}>Ordered Items:</Text>
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} x {item.quantity} = ${item.price * item.quantity}</Text>
        )}
      />
      <Text style={styles.total}>Total: ${order.total}</Text>

      <Text style={styles.upd}>Update Status:</Text>
      <Picker
        selectedValue={status}
        style={{ height: 50, width: 200 ,color:'green' }}
        onValueChange={(itemValue) => updateStatus(itemValue)}
      >
        <Picker.Item label="Pending" value="pending" />
        <Picker.Item label="Shipped" value="shipped" />
        <Picker.Item label="Delivered" value="delivered" />
        <Picker.Item label="Cancelled" value="cancelled" />
      </Picker>

      <View style={{ marginTop: 20 , gap:10}}>
        <Button title="Delete Order" onPress={deleteOrder} color="red" />
        <Button title="Go Back" onPress={()=> navigation.goBack()}  />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { marginTop: 15, fontSize: 18, fontWeight: 'bold' },
  upd:{marginTop: 15, fontSize: 18, fontWeight: 'bold' , color:'darkblue'},
  total: { marginTop: 20, fontSize: 20, fontWeight: 'bold' }
});

export default OrderDetail;
