import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP } from "../App";
import { useNavigation } from "@react-navigation/native";

const ReviewScreen = ({ route }) => {
    const navigation = useNavigation();
  const { productId, Email ,userRole} = route.params;
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [userrole, setUserRole] = useState('');

  



  const fetchReviews = async () => {
    try {
      const res = await fetch(`${IP}:3000/api/reviews/${productId}`);
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      Alert.alert("Error", "Failed to load reviews");
    }
  };

  const loadUser = async () => {
    const email = await AsyncStorage.getItem('Email');
    const role = await AsyncStorage.getItem('userRole');
    setUserEmail(email);
    setUserRole(role);
  };

  const submitReview = async () => {
    if (!comment.trim()) return;

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert("Error", "No token found, please login again");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${IP}:3000/api/reviews/${productId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment, email: userEmail })
 
      });

      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);

      if (res.ok) {
        setComment('');
        await fetchReviews();
      } else {
        Alert.alert("Error", data.error || "Failed to submit review");
      }
    } catch (err) {
      console.log('Submit review error:', err);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id) => {
  const token = await AsyncStorage.getItem('token');
  const email = await AsyncStorage.getItem('Email');
  const role = await AsyncStorage.getItem('userRole');

  try {
    const res = await fetch(`${IP}:3000/api/reviews/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email, role })  
    });

    if (!res.ok) {
      const errorData = await res.json();
      Alert.alert("Error", errorData.error || "Failed to delete review");
    } else {
      fetchReviews();
    }
  } catch (error) {
    Alert.alert("Error", "Failed to delete review");
  }
};



useEffect(() => {
  const init = async () => {
    await loadUser();
    await fetchReviews();
  };

  const unsub = navigation.addListener('focus', init);
  return unsub;
}, [navigation]);


  

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: 'bold' }}>Reviews</Text>
        
      {loading && <Text>Loading...</Text>}


      <FlatList
        data={reviews}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
            <Text style={{ fontWeight: 'bold' }}>{item.user_email}</Text>
            <Text>{item.comment}</Text>
                    <View style={styles.edbtn}>
                        {userRole !== 'admin'  && userEmail === item.user_email && (
                         <Text style={styles.editbtn} onPress={() => navigation.navigate('ReviewUpdate',{ reviewId: item.id, comment: item.comment  })}>EDIT</Text>
                                                )}
                    {(item.user_email === userEmail || userrole === 'admin') && (
                        <Text
                          style={styles.deletebtn}
                          onPress={() =>
                              Alert.alert("Delete Product", "Are you sure you want to Delete Product?", [
                              { text: 'Cancel' },
                              { text: 'OK', onPress: () => deleteReview(item.id) },
                              ])
                          }
                          >DELETE</Text>                          
            
            )}
            
                    </View>
                        
            
          </View>
        )}
      />

      {userRole !== 'admin' && (
        <View>
            <TextInput
        placeholder="Write your review..."
        value={comment}
        onChangeText={setComment}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginVertical: 10,
          borderRadius: 5
        }}
        
      />
      <Button title="Submit Review" onPress={submitReview}  />
        </View>
      )}
    </View>
  );
};

export default ReviewScreen;


const styles = StyleSheet.create({
    
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
        borderRadius:5
    },
    edbtn:{
        flexDirection:'row',
        gap:10,
        alignContent:'center',
        marginTop:18
    },
})