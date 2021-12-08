import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import dbh from '../Config';

const AdminEvents = ({ navigation }) => {

    const [eventname, seteventname] = useState();
    const [desc, setdesc] = useState();
    const [date, setdate] = useState();
    const [location, setlocation] = useState();
    const [link, setlink] = useState();

    const AddEvent = (eventname, desc, date, location, link) => {
        try{
            const AddEventNow = dbh.collection('events').doc(eventname).set({
                name: eventname,
                desc: desc,
                date: date,
                location: location,
                link: link
            }).then(
                alert('New Event Added...!'),
                seteventname(''),
                setdate(''),
                setdesc(''),
                setlink(''),
                setlocation('')
            )
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
        
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', borderColor: '#00FF00', borderRadius: 1}}>ADD EVENT</Text>
                <TextInput
                    label="Event Name"
                    value={eventname}
                    underlineColor= '#000'
                    placeholder={'The Farmers Protest'}
                    placeholderTextColor= "blue"
                    left={<TextInput.Icon name="calendar" color="#000"/>}
                    onChangeText={eventname => seteventname(eventname)}
                    style={styles.inputs}
                    theme={{colors: {text: '#000'}}}
                />
                <TextInput
                    label="Description"
                    underlineColor= '#000'
                    value={desc}
                    keyboardType={'default'}
                    onChangeText={desc => setdesc(desc)}
                    placeholderTextColor= "#000"
                    left={<TextInput.Icon name="information-outline" color="#000"/>}
                    style={styles.inputs}
                    theme={{colors: {text: '#000'}}}
                />
                <TextInput
                    label="Event Date"
                    keyboardType={'default'}
                    underlineColor= '#000'
                    value={date}
                    onChangeText={date=>setdate(date)}
                    placeholderTextColor= "#000"
                    left={<TextInput.Icon name="calendar-today" color="#000"/>}
                    style={styles.inputs}
                    theme={{colors: {text: '#000'}}}
                />
                
                <TextInput
                    label="Event Location"
                    keyboardType={'default'}
                    underlineColor= '#000'
                    value={location}
                    onChangeText={location=>setlocation(location)}
                    placeholderTextColor= "blue"
                    placeholder={'Mumbai, Maharashtra'}
                    left={<TextInput.Icon name="map-marker-outline" color="#000"/>}
                    style={styles.inputs}
                    theme={{colors: {text: '#000'}}}
                />
                
                <TextInput
                    label="Event Link"
                    keyboardType={'url'}
                    underlineColor= '#000'
                    value={link}
                    onChangeText={link=>setlink(link)}
                    placeholderTextColor= "blue"
                    placeholder={'Link'}
                    left={<TextInput.Icon name="link" color="#000"/>}
                    style={styles.inputs}
                    theme={{colors: {text: '#000'}}}
                />

                <TouchableOpacity style={styles.add} onPress={()=>AddEvent(eventname, desc, date, location, link)}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>ADD EVENT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.add1} onPress={()=>navigation.navigate("AdminHome")}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>Admin Home</Text>
                </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    </View>

)};

const styles=StyleSheet.create({
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
    add1: {
        marginTop: 20,
        backgroundColor: '#18A490',
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

export default AdminEvents;