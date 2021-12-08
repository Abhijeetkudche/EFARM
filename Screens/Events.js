import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Icon, Image } from 'react-native-elements';
import dbh from '../Config';
import { Linking } from 'react-native';

const Events = () => {

  const [loadingContent, setloadingContent] = useState(true);

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ name, desc, date, location, link }) => {
  if(loadingContent){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{width: 60, height: 60}} source={require("../assets/SpinnerGIF.gif")}/>
      </View>
    )
  }
  else{
  return(
    <Card mode="outlined">
    <Card.Content>
        <View style={styles.card}>
            <Image 
              source={require('../assets/farmingevent.png')} 
              style={{width: 300, height: 150, marginTop: 15}}
            />
            <Text style={styles.title}>{name}</Text>
            <Text style={{fontWeight: '700', marginBottom: 10, marginTop: 10, fontSize: 14}}>Description</Text>
            <Text style={{marginLeft: 23, marginRight: 23}}>{desc}</Text>
            
            <View style={{flexDirection: 'row', marginTop: 15}}>
                <Icon name="today" />
                <Text style={{marginTop: 3, marginLeft: 5, fontWeight: 'bold'}}>{date}</Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 15, marginBottom: 10}}>
                <Icon name="location-pin" />
                <Text style={{marginTop: 3, fontWeight: 'bold'}}>{location}</Text>
            </View>
            <TouchableOpacity style={styles.linkOpener} onPress={()=>Linking.openURL(link)}>
                <Text style={{fontWeight: '700', color: '#483D8B'}}>Open Event Link</Text>
            </TouchableOpacity>
        </View>
    </Card.Content>
    </Card>
)}
}


    const [RealEvents, setRealEvents] = useState([]);
  
  useEffect(() => {
      
    const s = dbh.collection('events').onSnapshot(querySnapshot => {
        const RealEvents1 = [];

        querySnapshot.forEach(documentSnapshot => {
            RealEvents1.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
        });
        setRealEvents(RealEvents1);
        setTimeout(() => {
          setloadingContent(false)
        }, 2000);
        //console.log(RealEvents);
    })
    
      
  }, [])


  const renderItem = ({ item }) => (
    <Item name={item.name} desc={item.desc} date={item.date} location={item.location} link={item.link} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={RealEvents}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
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
    marginLeft: 20,
    marginTop: 15,
  },
  linkOpener: {
    backgroundColor: '#FFD700',
    width: 150,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10
  },
  card: {
    backgroundColor: '#90EE90',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    
  }
});

export default Events;