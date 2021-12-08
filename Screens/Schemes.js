import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Image } from 'react-native-elements';
import dbh from '../Config';
import { Linking } from 'react-native';


const Schemes = () => {

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


const Item = ({ sname, longdesc, link, url, features }) => {

  if(loadingContent){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{width: 60, height: 60}} source={require("../assets/SpinnerGIF.gif")}/>
      </View>
    )
  }
  else{
  return(
    <Card mode="outlined" style={{marginTop: 5, marginBottom: 5, borderRadius: 20, backgroundColor: '#FFF0F5'}}>
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
                style={{ width: 300, height: 150, borderRadius: 20 }}
                PlaceholderContent={<Image style={{width: 60, height: 60}} source={require("../assets/SpinnerGIF.gif")}/>}
            />
            <Text style={{fontWeight: '700', marginBottom: 10}}>Description</Text>
            <Text style={{fontFamily: 'sans-serif'}}>{longdesc}</Text>
            <TouchableOpacity onPress={()=>Linking.openURL(url)}>
                <Text style={{fontWeight: '700', marginTop: 15, marginBottom: 15, color: 'green'}}>Link : {url}</Text>
            </TouchableOpacity>
            <Text style={{fontWeight: '700', marginTop: 10, marginBottom: 10}}>Features : </Text>
            <Text>{features}</Text>
        </View>
    </Card.Content>
    </Card>
)}
}


    const [RealSchemes, setRealSchemes] = useState([]);
  
  useEffect(() => {
      
    const s = dbh.collection('schemes').onSnapshot(querySnapshot => {
        const RealSchemes1 = [];

        querySnapshot.forEach(documentSnapshot => {
            RealSchemes1.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
        });
        setRealSchemes(RealSchemes1);

        setTimeout(() => {
          setloadingContent(false)
        }, 2000);
        
        //console.log(RealSchemes);
    })
    
      
  }, [])


  const renderItem = ({ item }) => (
    <Item sname={item.name} link={item.imglink} longdesc={item.longdesc} url={item.url} features={item.features} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={RealSchemes}
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
    marginTop: 5,
    color: '#fff'
  },
  card: {
    backgroundColor: '#DC143C',
    marginTop: 8,
    borderRadius: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    
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

export default Schemes;