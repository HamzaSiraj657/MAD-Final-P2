import React, { useContext } from 'react';
import { View, Text, FlatList, Image, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from './context/CartContext';
import { IP } from '../App';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const handleDecrement = (id, quantity) => {
    if (quantity === 1) {
      Alert.alert(
        'Remove Item',
        'Are you sure you want to remove this product from the cart?',
        [
          { text: 'No' },
          { text: 'Yes', onPress: () => removeFromCart(id) },
        ]
      );
    } else {
      decrementQuantity(id);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No items in cart.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.image && (
              <Image
                source={{ uri: `${IP}:3000/uploads/${item.image}` }}
                style={styles.image}
              />
            )}

            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.pm}>
                <Text style={styles.price}>${item.price}</Text>

              <View style={styles.qtyContainer}>
                <TouchableOpacity style={styles.inc} onPress={() => handleDecrement(item.id, item.quantity)}>
                  <Text style={styles.col}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity style={styles.inc} onPress={() => incrementQuantity(item.id)}>
                  <Text style={styles.col}>+</Text>
                </TouchableOpacity>
              </View>
              </View>
            </View>

            <TouchableOpacity
            onPress={() => {
                Alert.alert(
                'Remove Item',
                'Are you sure you want to remove this product from the cart?',
                [
                    { text: 'No' },
                    { text: 'Yes', onPress: () => removeFromCart(item.id) },
                ]
                );
            }}
            style={styles.deleteIcon}
            >
            <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/128/484/484662.png" }}
                style={styles.deleteImage}
            />
            </TouchableOpacity>


          </View>
        )}
      />
     <Button
  title="Place Order"
  onPress={() => {
    const order = {
      id: Date.now(), 
      order_date: new Date().toISOString().split('T')[0],
      order_time: new Date().toLocaleTimeString(),
      status: 'pending',
      name: 'Test User', 
      address: '123 Test Street',
      phone: '000-000-0000',
      products: cartItems,
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    };

    navigation.navigate('OrderReview', { order , });
    
  }}
/>


      <Button title="Go Back" onPress={() => navigation.navigate('Product')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 , gap:10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  details: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold' },
  description: { fontSize: 14, color: '#666', marginVertical: 4 },
  price: { fontSize: 16, color: 'green' },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  pm:{
    flexDirection:'row',
    gap: 120
  },
  inc:{
    fontSize:18,
    color:'gold',
    borderColor:'grey',
    borderWidth:1,
    width:25,
    textAlign:'center'
  },
  deleteImage: {
  width: 24,
  height: 24,
  tintColor: 'red',     
  marginBottom:50
},

deleteIcon: {
  padding: 4,
},
col:{
  color:'gold',
  textAlign:'center'
}

});

export default Cart;
