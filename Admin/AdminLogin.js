import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from 'react-native-elements';
import { ActivityIndicator, DefaultTheme, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dbh from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { s, ScaledSheet } from 'react-native-size-matters';
// import LinearGradient from 'react-native-linear-gradient';

const AdminLogin = ({ navigation }) => {

    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [loading, setloading] = useState(false);

    const theme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          text: "white",
        }
      };

      const AdminLoginClick = (email, password) => {

        if(email==""){
            alert("No email found");
            if(password=""){
                alert("Please enter credentials")
            }
        }
        else{
            const authentic=dbh.collection("Admin").doc(email).get().then(
                documentSnapshot => authenticateNow(documentSnapshot, email, password)
            )
        }
    }

    const authenticateNow = async (documentSnapshot, email, password) => {

        if(email==documentSnapshot.get("username") && password==documentSnapshot.get("password")){
            alert("Logged In succesfully");
            
            //storing credentials in AsyncStorage
            navigation.navigate("AdminHome");
        }
        else{
            alert("Check credentials")
        }
    }

    return(
                <View style={styles.login}>
                    <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={{alignSelf: 'flex-start'}}>
                        <Text style={{ marginTop: 20, marginLeft: 20, alignSelf: 'center', color: 'white'}}>Back</Text>
                    </TouchableOpacity>
                     <View style={styles.login}>
                    <Text style={styles.login1}>LOGIN</Text>
                    <Image source={require("../assets/line_4.png")} style={{height: 4,width: 55, marginTop: 15}}/>
                    <TextInput
                        label="Username"
                        underlineColor= '#fff'
                        value={email}
                        placeholder={'Username'}
                        onChangeText={email=>setemail(email)}
                        placeholderTextColor= "#fff"
                        left={<TextInput.Icon name="account-outline" color="#fff"/>}
                        style={styles.inputs}
                        theme={theme}
                    />
                    {/* {!email.length>0 && (
                        <Text style={styles.error}>
                            Email address is not valid
                        </Text>
                    )} */}
                    <TextInput
                        label="Password"
                        secureTextEntry={true}
                        underlineColor= '#fff'
                        value={password}
                        placeholder={'Password'}
                        onChangeText={password=>setpassword(password)}
                        placeholderTextColor= "#fff"
                        left={<TextInput.Icon name="lock-outline" color="#fff"/>}
                        style={styles.inputs}
                        theme={{colors: {text: '#fff'}}}
                    />
                     <View style={styles.button}>
                        <TouchableOpacity onPress={()=>AdminLoginClick(email, password)} style={styles.submit}>
                            <Text style={styles.login1}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                </View>

           

)};

const styles=ScaledSheet.create({
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        
    },
    image: {
        height: '275@s',
        width: '350@s',
    },
    inputs: {
        fontSize: 16,
        color: '#000',
        fontWeight: "bold",
        marginTop: 7,
        alignSelf: 'center',
        width: 230,
        backgroundColor: '#000'
    },
    
    aft_submit: {
        marginTop: 10,
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    aft_submit1: {
        marginTop: 10,
        color: 'red',
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
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        backgroundColor: 'red',
    },
    login: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    login1: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        
    },
    login2: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    admin: {
        marginLeft: '280@s',
    },
    error: {
        marginTop: 10,
        color: 'red'
    },
    button: {
        marginTop: '30@s'
    },
})

export default AdminLogin;