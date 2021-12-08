import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, ToastAndroid } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Icon, Image } from 'react-native-elements';
import dbh from '../Config';
import { Linking } from 'react-native';

const callMag = () => {
    ToastAndroid.show("Expert Avatar",ToastAndroid.SHORT);
}



const openemail = (email) => {
    Linking.openURL('mailto:'+email)
}

const openContact = (mobile) => {
    let phoneNumber = mobile;
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${phoneNumber}`;
          }
          else {
            phoneNumber = `telprompt:${phoneNumber}`;
          }

          Linking.openURL(phoneNumber);
}

const Item = ({ name, mobile, email, link }) => (

    <Card mode="outlined" style={{marginBottom: 20, borderRadius: 20, alignSelf: 'center', width: 400}}>
    <Card.Content>
        <View style={styles.card}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>{name}</Text>
            <Avatar.Image 
              source={{uri: 'data:image/jpeg;base64,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'}}
              size={18}
              style={{marginTop: 8, marginLeft: 5}}
            />  
          </View>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{marginBottom: 20, marginTop: 10}}>{email}</Text>
        <Avatar.Image 
            onMagicTap={()=>callMag()}
            source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9BEJ3ahP-3FBcK2mCVqWFfoljlULTjZsXxg&usqp=CAU'}}
            size={80}
            style={{marginBottom: 20}}
        />
            <TouchableOpacity style={{flexDirection: 'row', marginTop: 10, marginBottom: 10, backgroundColor: '#B0E0E6', height: 40, width: 130, borderTopLeftRadius: 0, borderBottomLeftRadius: 20, borderTopRightRadius: 20, borderBottomRightRadius: 0, alignItems: 'center', justifyContent: 'center'}} onPress={()=>Linking.openURL(link)}>
                <Icon name="videocam" color="blue"/>
                <Text style={{fontWeight: '700', marginTop: 2, marginLeft: 5, color: 'blue'}}>Join Meeting</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={()=>openContact(mobile)} style={{flexDirection: 'row', marginTop: 15, backgroundColor: '#FFD700', height: 40, alignItems: 'center', justifyContent: 'center', width: 130, borderRadius: 30}}>
                    <Icon name="call" color="green"/>
                    <Text style={{fontSize: 16, marginLeft: 5, fontWeight: 'bold', color: 'green'}}>CONTACT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>openemail(email)} style={{flexDirection: 'row', marginLeft: 25, marginTop: 15, backgroundColor: '#FFD700', height: 40, alignItems: 'center', justifyContent: 'center', width: 130, borderRadius: 30}}>
                    <Icon name="email" color="green"/>
                    <Text style={{fontSize: 16, marginLeft: 5, fontWeight: 'bold', color: 'green'}}>EMAIL</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Card.Content>
    </Card>
);

const ShowExperts = () => {

    const [RealExperts, setRealExperts] = useState([]);
  
  useEffect(() => {
      
    const s = dbh.collection('experts').onSnapshot(querySnapshot => {
        const RealExperts1 = [];

        querySnapshot.forEach(documentSnapshot => {
            RealExperts1.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
        });
        setRealExperts(RealExperts1);
        //console.log(RealSchemes);
    })
    
      
  }, [])


  const renderItem = ({ item }) => (
    <Item name={item.name} mobile={item.mobile} email={item.email} link={item.link} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={RealExperts}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 5
  },
  card: {
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'row',
  }
});

export default ShowExperts;