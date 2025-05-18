import React ,{useState, useEffect, useContext} from "react";
import { View ,StyleSheet , Text ,FlatList,Alert,Image , TouchableOpacity, Button,TextInput} from "react-native";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";
import { IP } from "../App";
import { CartContext } from './context/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Product = () =>{
    const navigation = useNavigation();
    const [product, setproduct] = useState([]);
    const { addToCart } = useContext(CartContext);
    const [searchText, setSearchText] = useState('');
     const [filteredProducts, setFilteredProducts] = useState([]);
     const [userRole, setUserRole] = useState(null);
    const [Email, setUserEmail] = useState(null);

    const handleSearch = (text) => {
  const filtered = product.filter(item =>
    item.name.toLowerCase().includes(text.toLowerCase())
  );
  setFilteredProducts(text === '' ? product : filtered);
};

    

    const fetchproduct = async () =>{
        const token = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('userRole');
        const email = await AsyncStorage.getItem('Email');
        setUserEmail(email);
        setUserRole(role);
        const res = await fetch(`${IP}:3000/api/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }});
        
        const data = await res.json();
        setproduct(data);
        setFilteredProducts(data);
    };


    const deleteproduct = async (id)=>{
        const token = await AsyncStorage.getItem('token');
         await fetch(`${IP}:3000/api/products/${id}` ,{ method:'DELETE', headers: {
        Authorization: `Bearer ${token}`,
      }});
         fetchproduct();
    }






    
    useEffect(() =>{
        const unsub = navigation.addListener('focus',fetchproduct);
        return unsub;
    },[navigation]);
    

    
    return(
        <View style={styles.container} >
            <View style={styles.addcontan}>
                <View>
                    <View style={styles.wow}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by product name"
                        value={searchText}
                        onChangeText={setSearchText} 
                    />
                    <TouchableOpacity style={styles.cartIcon} onPress={() => handleSearch(searchText)}>
                        <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/128/149/149852.png" }}
                        style={styles.searchIcon}
                        />
                    </TouchableOpacity>
                    </View>
                        {userRole === 'admin' && (
                            <Button 
                             title="Orders View" color={'green'} onPress={() => navigation.navigate('Orders')}
                        />
                        )}
                    {userRole !== 'admin'&&(
                        <TouchableOpacity
                                onPress={() => navigation.navigate('Cart') }
                                style={styles.cartIcon}
                                >
                                <Image
                                    source={{ uri: "https://cdn-icons-png.flaticon.com/128/3514/3514491.png" }}
                                    style={styles.cartImage}
                                />
                    </TouchableOpacity>
                    )}
                </View>
                { userRole === 'admin' &&(
                    <Text style={styles.addtext} onPress={()=>navigation.navigate("Add")}>+ Add</Text>
                )

                }
                <Text style={styles.pname}>Product List</Text>
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=>(
                       <View style={styles.itemcon}>
                    {item.image && (
                        <Image source={{ uri: `${IP}:3000/uploads/${item.image}` }} style={{ width: 150, height: 150, borderRadius: 8 }} />
                    )}
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                    <View style={styles.edbtn}>
                        {userRole === 'admin' && (
                            <Text style={styles.editbtn} onPress={() => navigation.navigate('Update', item)}>EDIT</Text>
                        )}
                        <Text style={styles.detailbtn} onPress={() => navigation.navigate('Detail', {...item,Email: Email, userRole: userRole} )}>DETAIL</Text>
                        {userRole === 'admin' && (
                            <Text
                        style={styles.deletebtn}
                        onPress={() =>
                            Alert.alert("Delete Product", "Are you sure you want to Delete Product?", [
                            { text: 'Cancel' },
                            { text: 'OK', onPress: () => deleteproduct(item.id) },
                            ])
                        }
                        >DELETE</Text>
                        )}
                    </View>
                    {userRole !== 'admin' && (
                        
                            <TouchableOpacity
                    style={styles.acartBtn}
                    onPress={() => addToCart(item)}
                    >
                    <Text style={styles.acart}>Add to Cart</Text>
                    </TouchableOpacity>
                        
                    )}
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                      <Image
                        source={{uri:"https://cdn-icons-png.flaticon.com/512/685/685391.png"}} 
                        style={styles.emptyImage}
                        resizeMode="contain"
                      />
                      <Text style={styles.emptyText}>No products available</Text>
                    </View>
                  }
                />
            </View>
           <Button title="GO TO HomePage" onPress={()=> navigation.navigate('Home')}/>
            <Footer/>
        </View>

    );
}

export default Product;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    addcontan:{
        flex:1,
       padding:10
    },
    addtext:{
        backgroundColor:"purple",
        padding:10,
        fontSize:20,
        color:"white",
        textAlign:'center',
        marginTop:10
    },
    pname:{
        fontSize:25,
        color:"black",
        textAlign:'center',
        marginTop:10,
        marginBottom:10
    },
    itemcon:{
        backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,

        
    },
    name:{
        marginTop:10,
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center'
    },
    price:{
        marginTop: 8,
        fontSize: 16,
         fontWeight: '600',
        color: '#2c3e50',
        textAlign: 'center',
    },
    description:{
        fontSize: 14,
        color: '#666',
        marginTop: 5,
        textAlign: 'center',
    },
    edbtn:{
        flexDirection:'row',
        gap:10,
        alignContent:'center',
        marginTop:18
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
        borderRadius:5
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
      },
      emptyImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
      },
      emptyText: {
        fontSize: 18,
        color: '#888',
      },
      detailbtn: {
  color: "white",
  fontSize: 15,
  fontWeight: "bold",
  backgroundColor: "green",
  padding: 8,
  borderRadius: 5,
  marginHorizontal: 5,
},
cartImage: {
  width: 24,
  height: 24,
  tintColor: 'black',     
  marginBottom:10
},

cartIcon: {
  padding: 4,
  alignItems:'flex-end'
},
       acart:{
          color:'#fff',
          backgroundColor:'black',
        fontSize:15,
        fontWeight:'bold',
        width:220,
        height:35,
        borderRadius:15,
        textAlign:'center',
        paddingTop:7,
        marginTop:20
        
        },
        searchInput: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  paddingHorizontal: 90,
  paddingVertical: 8,
  marginBottom: 10,
  fontSize: 16,
  
},
wow:{
    flexDirection:'row',
    gap:10
},
searchIcon:{
    width: 24,
  height: 24,
  alignItems:"flex-end",
   marginTop:5
    
    
}
})