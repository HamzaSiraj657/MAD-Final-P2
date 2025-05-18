import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { IP } from '../App';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  const fetchOrders = async () => {
    const token = await AsyncStorage.getItem('token');
  const res = await fetch(`${IP}:3000/api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
    const data = await res.json();
    setOrders(data);
  };

    useEffect(() =>{
        const unsub = navigation.addListener('focus',fetchOrders);
        return unsub;
    },[navigation]);
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={styles.orderItem}
            
          >
            <Text style={styles.orderText}>Order #{item.id}</Text>
            <Text>Date: {item.order_date} at {item.order_time}</Text>
            <Text>Total: ${item.total}</Text>
            <Button title='view Order' color={'green'} onPress={()=>navigation.navigate('OrderDetail', { order: item })}/>
          </View>
        )}
      />
      <Button title='Go to HomePage' onPress={()=>navigation.navigate('Home')}/> 
      <Button title='Go to ProductView' onPress={()=>navigation.navigate('Product')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 , gap: 10},
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  orderItem: { padding: 16, backgroundColor: '#eee', marginBottom: 10 },
  orderText: { fontSize: 18, fontWeight: 'bold' }
});

export default Orders;
