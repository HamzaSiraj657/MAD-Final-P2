import React , {useState} from "react";
import {View , StyleSheet, TextInput, Button , Alert} from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";



const Contact = () =>{
        const [name , setName] = useState('');
        const [email , setEmail] = useState('');
        const [message , setMessage] = useState('');

       
    return(
        <View style={styles.container}>
            <Header title={"Contact Page"}/>
            <View  style={styles.con}>
                <TextInput
                    style={styles.conin}
                    placeholder="Name"
                    value={name}
                    onChange={setName}
                />
                <TextInput
                    style={styles.conin}
                    placeholder="Email"
                    value={email}
                    onChange={setEmail}

                />
                <TextInput
                    style={[styles.conin,styles.textarea]}
                    placeholder="Message"
                    value={message}
                    onChange={setMessage}

                />

                <Button
                    
                    title="Submit" onPress={()=>{Alert.alert("Your Contact is Submitted") , setName(''),setMessage(''),setEmail('')}}
                   
                />

            </View>
            <Footer/>
        </View>
    );
}


export default Contact;


const styles = StyleSheet.create({
    container:{
       flex:1
    },
    con:{
        flex:1,
       
        padding:16
    },
    conin:{
        borderWidth: 1,
         borderColor:"lightgrey",
       marginBottom: 10,
    },
    textarea:{
        height:100
    }
    
})