import React , {useState} from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button , Alert,TouchableOpacity} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "../components/Footer";
import { IP } from "../App";
import { CartContext } from './context/CartContext';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Detail = () => {
  const { addToCart } = useContext(CartContext);

 const navigation = useNavigation();
  const route = useRoute();
  const { id, name, description, price, image ,userRole , Email} = route.params;

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity <= 0) {
      Alert.alert(
        'Invalid Quantity',
        'Are you sure you want to add zero items?',
        [
          { text: 'No', onPress: () => setQuantity(1), style: 'cancel' },
          {
            text: 'Yes',
            onPress: () => {
              if (quantity === 0) {
                
                return;
              }
            },
          },
        ]
      );
      return;
    }

    
    for (let i = 0; i < quantity; i++) {
      addToCart({ id, name, description, price, image });
    }
    navigation.navigate('Cart');
  };
  const deleteproduct = async (id)=>{
    const token = await AsyncStorage.getItem('token');
           await fetch(`${IP}:3000/api/products/${id}` ,{ method:'DELETE', headers: {
                   Authorization: `Bearer ${token}`,
                 }});
           Alert.alert("Product deleted");
           navigation.goBack();
      }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {image && (
          <Image
            source={{ uri: `${IP}:3000/uploads/${image}` }}
            style={styles.image}
          />
        )}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.cen}>
            {userRole === 'admin' && (
              <Text style={styles.editbtn} onPress={() => navigation.navigate('Update', { id, name, description, price, image })}>EDIT</Text>
                                

            )}
                                {userRole === 'admin' && (
                                  <Text
                                style={styles.deletebtn}
                                onPress={() =>
                                    Alert.alert("Delete Product", "Are you sure you want to Delete Product?", [
                                    { text: 'Cancel' },
                                    { text: 'OK', onPress: () => deleteproduct(id) },
                                    ])
                                }
                                >DELETE</Text>
                                 
                                )}
                                
                                <Button title="Reviews" onPress={() => navigation.navigate('Review', { productId: id ,Email,userRole })} />

                                <Button title="Go Back" onPress={() => navigation.goBack()} />
                                  

        </View>
       {userRole !== 'admin' && (
        
           <View style={styles.qtyContainer}>
        <TouchableOpacity style={styles.inc} onPress={() => setQuantity((q) => (q > 0 ? q - 1 : 0))}>
          <Text style={styles.col}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{quantity}</Text>
        <TouchableOpacity style={styles.inc} onPress={() => setQuantity((q) => q + 1)}>
          <Text style={styles.col}>+</Text>
        </TouchableOpacity>
      </View>
       
        
       )}
       {userRole !== 'admin' && (
          <Text style={styles.acart} onPress={handleAddToCart} >Add to Cart</Text>
       )}
       
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    color: "green",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  editbtn:{
        color:"white",
        fontSize:15,
        fontWeight:'bold',
        backgroundColor:"darkslateblue",
        padding:8,
        borderRadius:5
    },
    deletebtn:{
        color:"white",
        fontSize:15,
        fontWeight:'bold',
        backgroundColor:"red",
        padding:8,
        borderRadius:5},
        cen:{
            flex:1,
            flexDirection:'row',
            textAlign:'center',
            gap:30
        },
        acart:{
          color:'#fff',
          backgroundColor:'black',
        fontSize:15,
        fontWeight:'bold',
        width:"100%",
        height:35,
        borderRadius:5,
        textAlign:'center',
        paddingTop:7,
        marginTop:30
        
        },
        qtyContainer: {
          marginTop:40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  qtyText: {
    marginHorizontal: 20,
    fontSize: 20,
  },
  inc:{
    fontSize:18,
    color:'gold',
    borderColor:'grey',
    borderWidth:1,
    width:25,
    textAlign:'center'
  },
  col:{
  color:'gold',
  textAlign:'center'
}
});