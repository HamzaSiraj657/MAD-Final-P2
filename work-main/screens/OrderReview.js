import React, { useState , useContext } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { IP } from '../App';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './context/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const OrderReview = ({ route }) => {
  const { cartItems ,clearCart, } = useContext(CartContext);
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');


  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!name || !address || !phone) {
      Alert.alert("Missing Info", "Please fill in all customer details.");
      return;
    }

    const filteredItems = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    const response = await fetch(`${IP}:3000/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name,
        address,
        phone,
        total,
        items: filteredItems,
         
      })
    });

    if (response.ok) {
      Alert.alert("Order Placed", "Your order has been placed.", [
        { text: "OK", onPress: () => navigation.navigate("Product") }
      ]);
    } else {
      Alert.alert("Failed", "Order could not be placed.");
    }
    clearCart();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Information</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />

      <Text style={styles.subTitle}>Review Items:</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          
          <Text>{item.name} x {item.quantity} = ${item.price * item.quantity}</Text>
        )}
      />
      <Text style={styles.total}>Total: ${total}</Text>
      <Button title="Place Order" onPress={handlePlaceOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 8, borderRadius: 5 },
  subTitle: { marginTop: 10, fontSize: 16, fontWeight: 'bold' },
  total: { marginTop: 10, fontSize: 18, fontWeight: 'bold' }
});

export default OrderReview;
