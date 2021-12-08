import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar, BackHandler, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'expo-linear-gradient';
import dbh from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScaledSheet } from 'react-native-size-matters';

const Register = ({ navigation }) => {

    const [name, setname] = useState()
    const [passw, setpassw] = useState()
    const [email, setemail] = useState()
    const [contact, setcontact] = useState()
    const [other1, setother1] = useState()
    const [other2, setother2] = useState()

    const Succes = () => {
        navigation.navigate("Login")
    }

    const addUser = (name, email, passw, contact, other1, other2) => {

        if(name == null){
            alert("Enter Name")
        }
        else if(email == null){
            alert("Enter Email")
        }
        else if(passw == null){
            alert("Enter Password")
        }
        else if(contact == null){
            alert("Enter Contact")
        }
        else if(other1 == null){
            alert("Enter Other1")
        }
        else if(other2 == null){
            alert("Enter Other2")
        }
        else{
            dbh.collection("users")
            .doc(email)
            .set({
                name: name,
                email: email,
                password: passw,
                contact: contact,
                other1: other1,
                other2: other2,
                vs: 0,
                verification_status: 'Not Verified'
            }).then(
                alert("Registered Succesfully"),console.log("User Added with name ",email),Succes()
            )
        }
}


useEffect(() => {
    const backAction = () => {
      navigation.navigate("Login")
    };

    const backHandler1 = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler1.remove();
  }, []);


    const registeralreadyexist = (name, email, passw, contact, other1, other2) => {
        
        // const [emaildfound, setemaildfound] = useState([]);
        // var emailid="";
        // const pu = dbh.collection('users').where('email','==',email).onSnapshot(querySnapshot=>{
            
        //     querySnapshot.forEach(documentSnapshot=>{
        //         setemaildfound(...documentSnapshot.get("email"))
        //         // console.log("Wait wait",documentSnapshot.data())
        //         // // em = documentSnapshot.id
        //         // console.log("ID : ",documentSnapshot.id)
        //     })
        // })
        // console.log(emaildfound)
        // console.log(alreadyExist)
        // if(emaildfound==email){
        //     alert("Account already exist with email...!")
        // }
        // else{

                var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                var regexp=/^(\d{10})$/;
                var regPass=/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

                if(!emailRegex.test(email)){
                    ToastAndroid.show("Email not valid",ToastAndroid.SHORT)
                }else if(!regexp.test(contact)){
                    ToastAndroid.show("Mobile Number not valid",ToastAndroid.SHORT)
                }else if(!regPass.test(passw)){
                    ToastAndroid.show("Invalid Password type",ToastAndroid.SHORT)
                }else{
                    ToastAndroid.show("All Information is Valid...!",ToastAndroid.SHORT)
                    addUser(name, email, passw, contact, other1, other2)
                }
            

        // }
    }
    

    return(
        <ScrollView style={{backgroundColor: "yellow"}}>
            <View style={styles.login}>
                <View style={styles.login}>
                    <Text style={styles.login1}>REGISTER</Text>
                    <Image source={require("../assets/line_4.png")} style={{height: 3,width: 85, marginTop: 15}}/>
                    <TextInput
                        label="Name"
                        value={name}
                        underlineColor= '#000'
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="account-outline" color="#000"/>}
                        onChangeText={name=>setname(name)}
                        style={styles.inputs}
                        theme={{colors: {text: '#000'}}}
                    />
                    
                    <TextInput
                        label="Email"
                        value={email}
                        underlineColor= '#000'
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="email-outline" color="#000"/>}
                        onChangeText={email=>setemail(email)}
                        style={styles.inputs}
                        theme={{colors: {text: '#000'}}}
                    />
                    <TextInput
                        label="Password"
                        value={passw}
                        underlineColor= '#000'
                        secureTextEntry={true}
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="lock-outline" color="#000"/>}
                        onChangeText={passw=>setpassw(passw)}
                        style={styles.inputs}
                        theme={{colors: {text: '#000'}}}
                    />
                    <TextInput
                        label="Contact"
                        value={contact}
                        underlineColor= '#000'
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="phone-outline" color="#000"/>}
                        onChangeText={contact=>setcontact(contact)}
                        style={styles.inputs}
                        theme={{colors: {text: '#000'}}}
                        maxLength={10}
                    />
                    <TextInput
                        label="Address"
                        value={other1}
                        underlineColor= '#000'
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="home-edit-outline" color="#000"/>}
                        onChangeText={other1=>setother1(other1)}
                        style={styles.inputs}
                        theme={{colors: {text: '#000'}}}
                    />
                    <TextInput
                        label="State"
                        value={other2}
                        underlineColor= '#000'
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="map-marker-outline" color="#000"/>}
                        onChangeText={other2=>setother2(other2)}
                        style={styles.inputs}
                        theme={{colors: {text: '#000'}}}
                    />

                </View>
                <View style={styles.login}>
                    <View>
                        <TouchableOpacity onPress={()=>registeralreadyexist(name, email, passw, contact, other1, other2)} style={styles.submit}>
                            <Text style={styles.login2}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.login2}>
                        
                        <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={{justifyContent: 'center', alignItems: 'center', paddingTop: 60}}>
                            <Text style={styles.aft_submit}>Already have an account? LOGIN NOW!</Text>
                        </TouchableOpacity>
                        <Image source={require("../assets/line_4.png")} style={{ alignSelf: 'center', height: 4,width: 75, marginTop: 25}}/>
                    </View>
                    
                </View>
                {/* <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                    <Image source={require("../assets/group_3.png")} style={{height: 60,width: 75, marginTop: 15}}/>
                    <Image source={require("../assets/group_38.png")} style={{height: 60,width: 75, marginTop: 15}}/>
                    <Image source={require("../assets/group_39.png")} style={{height: 60,width: 75, marginTop: 15}}/>
                </View> */}
            </View>


        </ScrollView>
    )
};

const styles=ScaledSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 800
    },
    inputs: {
        backgroundColor: 'transparent',
        fontSize: 16,
        color: '#000',
        fontWeight: "bold",
        marginTop: '11@s',
        alignSelf: 'center',
        width: 260,
        marginTop: '15@s',
        marginBottom: '10@s'
    },
    
    aft_submit: {
        marginTop: 10,
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold'
    },
    styled_input: {
        width: 90
    },
    space: {
        marginTop: 30
    },
    submit: {
        width: 113,
        height: 40,
        borderRadius: 90,
        backgroundColor: '#3D15FF',
        marginTop: '40@s',
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        backgroundColor: 'yellow',
    },
    login1: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: '35@s',
    },
    login2: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
       
    },
   
})

export default Register;