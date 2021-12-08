import React, { useEffect } from 'react';
import { ImageBackground, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const Welcome = ({ navigation }) => {

  useEffect(() => {
    const tmout = setTimeout(()=>{
      navigation.navigate('Login')
    },3000)
  }, [])

    return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ImageBackground
        style={styles.coverImage}
        source={{
          uri: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YWdyaWN1bHR1cmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        }}>
        <View style={styles.textView}>
        <View style={{flexDirection: 'row'}}>
        
            {/* <Text onPress={()=>navigation.navigate("Login")} style={styles.imageContinue}>User</Text>

            <Text style={styles.imageContinue1}>Admin</Text> */}

        </View>
          <Text style={styles.imageText}>WELCOME</Text>
          <Text style={styles.imageText}>TO</Text>
          <Text style={styles.imageText}>E-FARM</Text>
        </View>
      </ImageBackground>
    </View>
)}

const styles = ScaledSheet.create({
    container: {
      flex: 1,
    },
    coverImage: {
      width: '100%',
      height: '100%',
    },
    textView: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    imageText: {
      fontSize: 22,
      color: 'black',
      fontWeight: 'bold',
    },
    imageContinue: {
        left: '-100@s',
        bottom: '265@s',
        color: 'black',
        fontSize: '14@s',
        fontWeight: 'bold'
    },
    imageContinue1: {
        left: '130@s',
        bottom: '265@s',
        color: 'white',
        fontSize: '14@s',
        fontWeight: 'bold'
    },
  });

export default Welcome;    