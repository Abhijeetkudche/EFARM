import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native'; 
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chip, Button } from 'react-native-paper';
import dbh from '../Config';

const Home = ({ navigation }) => {

    console.log("No problem")

    const STORE_EMAIL = '@save_email';
    const STORE_PASSWORD = '@save_password';

    //logged User
    const [email, setemail] = useState();
    const [password, setpassword] = useState();

    //Home Page Data
    const [users, setUsers] = useState([]);

    const [loading, setloading] = useState(false);

    //loading check
    if(loading){
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size={'small'} animating={true} />
            </View>
        )
    }

    const call = async () => {
        try{
            const userEmail = await AsyncStorage.getItem(STORE_EMAIL);
            const userPass = await AsyncStorage.getItem(STORE_PASSWORD);
            if(userEmail !== "" && userPass !== ""){
                setemail(userEmail);
                setpassword(userPass);
            }else{
                alert("Please sign in again")
            }
        }
        catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        
        call();
        const subscriber = dbh.collection('Users').onSnapshot(
            querySnapshot => {
            const users = [];

            querySnapshot.forEach(documentSnapshot => {
                users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
                });
        });

      setUsers(users);
      setLoading(false);
    });
        
    return () => subscriber();
        
    }, [])

    console.log(users)

    // console.log(email)
    const [visible, setVisible] = React.useState(false);
    
    const renderItem = ({ item }) => (
        <Item email={item.email} name={item.name} />
      );


    //item
    const Item = ({ email, name }) => (
        <View style={styles.item}>
          <Text>{email}</Text>
          <Text>{name}</Text>
        </View>
      );

    return(
    <ScrollView>
    <View>
        <View style={styles.choice}>
            
            <ScrollView>
                <TouchableOpacity>
                <Button mode="outlined" onPress={() => console.log('Pressed')}>
                    Farm Agencies
                </Button>
                </TouchableOpacity>
            
                <TouchableOpacity>
                <Button mode="outlined" onPress={() => console.log('Pressed')}>
                    Farm Schemes
                </Button>
                </TouchableOpacity>
            
                <TouchableOpacity>
                <Button mode="outlined">
                    Farm Loans
                </Button>
                </TouchableOpacity>

            </ScrollView>
          
        </View>       
        
    </View>
    <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={item=>item.email}
        />
  );
   
    </ScrollView>
)};

const styles=StyleSheet.create({
    main: {
        alignItems: 'center',
        justifyContent: 'center'        
    },
    choice: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    // options: {
    //     width: 92,
    //     height: 30,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 40,
    //     backgroundColor: '#A3A6A6',
    //     marginLeft: 15
    // },
})

export default Home;