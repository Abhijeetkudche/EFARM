import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Image } from 'react-native-elements';
import dbh from '../Config';
import { Linking } from 'react-native';

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

const Item = ({ sname, longdesc, link, url, features }) => (

    <Card mode="outlined">
    <Card.Content>
        <View style={styles.card}>
            <Avatar.Image
                source={{uri:link}}
                size={35}
            />
            <Text style={styles.title}>{sname}</Text>
            
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontWeight: '700'}}>Image</Text>
            <Image
                source={{uri:link}}
                style={{ width: 200, height: 200 }}
                PlaceholderContent={<ActivityIndicator size={"small"} animating={true} />}
            />
            <Text style={{fontWeight: '700', marginBottom: 10}}>Description : </Text>
            <Text>{longdesc}</Text>
            <TouchableOpacity onPress={()=>Linking.openURL(url)}>
                <Text style={{fontWeight: '700', marginTop: 10, color: 'green'}}>Link : {url}</Text>
            </TouchableOpacity>
            <Text style={{fontWeight: '700', marginTop: 10, marginBottom: 10}}>Features : </Text>
            <Text>{features}</Text>
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
        //console.log(RealExperts);
    })
    
      
  }, [])


  const renderItem = ({ item }) => (
    <Item sname={item.name} link={item.imglink} longdesc={item.longdesc} url={item.url} features={item.features} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={RealExperts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
    backgroundColor: '#FAFAFA',
    marginTop: 8,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 2,
    marginBottom: 20,
    opacity: 0.7,
    flexDirection: 'row',
  }
});

export default ShowExperts;