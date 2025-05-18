import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP } from "../App";
import { useNavigation } from "@react-navigation/native";

const ReviewUpdate = ({ route }) => {
    const navigation = useNavigation();
  const { reviewId, comment } = route.params;
  const [newComment, setNewComment] = useState(comment || "");

  const handleUpdate = async () => {
    const email = await AsyncStorage.getItem('Email');
    const token = await AsyncStorage.getItem('token');

    try {
      const res = await fetch(`${IP}:3000/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email, comment: newComment })
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert("Success", "Review updated");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.error || "Update failed");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Update Your Review</Text>
      <TextInput
        value={newComment}
        onChangeText={setNewComment}
        placeholder="Update your comment"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 20 }}
      />
      <Button title="Update Review" onPress={handleUpdate} />
    </View>
  );
};

export default ReviewUpdate;
