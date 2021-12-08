import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import dbh from '../Config';

const ExpertSection = ({ navigation }) => {
    
    const [name, setname] = useState();
    const [mn, setmn] = useState();
    const [email, setemail] = useState();
    const [link, setlink] = useState();

    const AddExpert = (name, mn, email, link) => {
        try{
            const AddExpertsNow = dbh.collection('experts').doc(email).set({
                name: name,
                mobile: mn,
                email: email,
                link: link
            }).then(
                alert('New Expert Added...!'),
                setname(''),
                setmn(''),
                setemail(''),
                setlink(''),
            )
            navigation.navigate("AdminHome")
        }
        catch(err){
            console.log("Error while adding new event : ",err)
        }
    }

    return(
        <View style={styles.container}>
            <ImageBackground
                style={styles.coverImage}
                source={{
                uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhAIBwgKCgkNDRUFCgUFBQ8ICRANFBUWFhQRExMYHCggGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUNGgUFDisZExkrKysrKysrKysrKysrLS0rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAABAgAG/8QAFhABAQEAAAAAAAAAAAAAAAAAAAEx/8QAGgEBAAMBAQEAAAAAAAAAAAAAAwABAgcFBP/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwDnoRC+yupmEQjqKIIqplJUxUMIhHWVGAwVRlJUOsmEQjqqZhgmGMVFGYDMFVEgjqjCIR1lTRmg6qlSVDqjCIR1VU01mmiqKMwGYxWTCIR1DCIR1TlYRC6TXoGEQjqKIIqplJUxUMIhHWVGAwVRlJUOsmEQjqqZhgmGMVFGYDMFVEgjqjCIR1lTRmg6qlSVDqjCIR1VU01mmiqKMwGYxWTCIR1DCIR1TlYRC6TXoGEQjqKIIqplJUxUMIhHWVGAwVRlJUOsmEQjqqZhgmGMVFGYDMFVEgjqjCIR1lTRmg6qlSVDqjCIR1VU01mmiqKMwGYxWTCIR1DCIR1TlYRC6TXoGEQjqKIIqplJUxUMIhHWVGAwVRlJUOsmEQjqqZhgmGMVFGYDMFVEgjqjCIR1lTRmg6qlSVDqjCIR1VU01mmiqKMwGYxWTCIR1DCIR1TlYRC6TXoGEQjqKIIqplJUxUMIhHWVGAwVRlJUOsmEQjqqZhgmGMVFGYDMFVEgjqjCIR1lTRmg6qlSVDqjCIR1VU01mmiqKMwGYxWTCIR1DCIR1TlYRC6TXoGEQjqKIIqplJUxUMIhHWVGAwVRlJUOsmEQjqqZhgmGMVFGYDMFVEgjqjCIR1lTRmg6qlSVDqjCIR1VU01mmiqKMwGYxWTCIR1DCIR1TlYRC6TXoGEQjqKIIqplJUxUMIhHWVGAwVRlJUOsmEQjqqZhgmGMVFGYDMFVEgjqjCIR1lTRmg6qlSVDqjCIR1VU01mmiqKMwGYxWTCIR1DCIR1TlYRC6TXoGEQjqKIIqplJUxUMIhHWVGAwVRlJUOsmEQjqqZhgmGMVFGYDMFVEgjqjCIR1lTRmg6qlSVDqjCIR1VU01mmiqKMwGYxWTCIR1DCIR1TlYRC6TXoGEQjqKIIqplJUxUMIhHWVGAwVRlJUOsmEQjqqZhgmGMVFGYDMFVEgjqjCIR1lTRmg6qlSVDqjCIR1VU01mmiqKMwGYxWTCIR1DCIR1TlYRC6TXoGEQjqKIIqplJUxUMIhHWVGAwVRlJUOsmEQjqqZhgmGMVFGYDMFVEgjqjCIR1lTRmg6qlSVDqjCIR1VU01mmiqKMwGYxWTCIR1DCIR1TlYWZ0mvQMLMOooswqplMzFQwsw6yoxmFUZTMOsmFmHVUzDGZioozAwqpRZh1RhZh1lTQsOqrKZh1RhZh1VU00sKoTMZmKyYWYdQwsw6p//Z'
            }}>
            
            <TouchableOpacity onPress={()=>navigation.navigate("AdminHome")} style={{alignSelf: 'flex-start', marginTop: 25, marginLeft: 20, color: 'white'}}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>Back</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', borderColor: '#00FF00', borderRadius: 1}}>ADD EXPERT</Text>
                    <TextInput
                        label="Name"
                        value={name}
                        underlineColor= '#000'
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="account-outline" color="#000"/>}
                        onChangeText={name => setname(name)}
                        style={styles.inputs}
                        theme={{colors: {text: '#000'}}}
                    />
                    <TextInput
                        label="Mobile No."
                        underlineColor= '#000'
                        value={mn}
                        keyboardType={'number-pad'}
                        onChangeText={mn => setmn(mn)}
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="cellphone-android" color="#000"/>}
                        style={styles.inputs}
                        theme={{colors: {text: '#000'}}}
                    />
                    <TextInput
                        label="Email ID"
                        keyboardType={'email-address'}
                        underlineColor= '#000'
                        value={email}
                        onChangeText={email=>setemail(email)}
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="email-outline" color="#000"/>}
                        style={styles.inputs}
                        theme={{colors: {text: '#000'}}}
                    />
                    
                    <TextInput
                        label="Conference Link"
                        keyboardType={'url'}
                        underlineColor= '#000'
                        value={link}
                        onChangeText={link=>setlink(link)}
                        placeholderTextColor= "blue"
                        placeholder={'Link'}
                        left={<TextInput.Icon name="link-variant" color="#000"/>}
                        style={styles.inputs}
                        theme={{colors: {text: '#000'}}}
                    />

                    <TouchableOpacity style={styles.add} onPress={()=>AddExpert(name, mn, email, link)}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>ADD EXPERT</Text>
                    </TouchableOpacity>
                    
                    </View>
                </View>
            </ImageBackground>
        </View>
)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputs: {
        backgroundColor: 'transparent',
        fontSize: 16,
        color: '#000',
        fontWeight: "bold",
        marginTop: 7,
        alignSelf: 'center',
        width: 230,
    },
    add: {
        marginTop: 20,
        backgroundColor: '#66CDAA',
        width: 120,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35
    },
    coverImage: {
        width: '100%',
        height: '100%',
      },
})

export default ExpertSection;
