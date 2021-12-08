import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, Alert, View, Text, Image, StyleSheet , ScrollView, TouchableOpacity, FlatList, StatusBar, Touchable, BackHandler } from 'react-native'; 
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import dbh from '../Config';
import SelectDropdown from 'react-native-select-dropdown'
import { Divider, Icon } from 'react-native-elements';

const Home1 = ({ navigation, route }) => {


//   const [RealUsers, setRealUsers] = useState([]);
  
  const [RealSchemes, setRealSchemes] = useState([]);

  const [cropsInfo, setcropsInfo] = useState([]);

  const [eventdata, seteventdata] = useState([]);

  const [loadingContent, setloadingContent] = useState(true);
  
//   const Item = ({ email, name }) => (
//     <Card mode="outlined">
//     <Card.Content>
//         <View style={styles.card}>
//             <Text style={styles.title}>{email}</Text>
//             <TouchableOpacity>
//                 <Text>{name}</Text>
//             </TouchableOpacity>
//         </View>
//     </Card.Content>
//     </Card>
//   );
  
  const Item1 = ({ name, shortdesc, link }) => {
    return(
    <Card mode="outlined">
    <Card.Content>
        <View style={styles.card}>
        <View style={{flexDirection: 'row'}}>
            <Avatar.Image 
                source={{uri:link}}
                size={30}
            />
            <Text style={styles.title}>{name}</Text>
        </View>
          
                <Text style={styles.shortdesc}>{shortdesc}</Text>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center',backgroundColor:'red', paddingTop:10, marginTop: 10, paddingLeft:20, paddingRight:20, paddingBottom:10}}>
                    <Text style={{ alignItems: 'center', color:'white', fontWeight:'bold'}}>More info...</Text>
            </TouchableOpacity>
        </View>
    </Card.Content>
    </Card>
  )
};

const Item2 = ({ name, link }) => {
  return(
    <TouchableOpacity style={styles.round} onPress={()=>navigation.navigate("CropViewData")}>
      <Avatar.Image size={60} source={{uri:link}} />
      {/* <Text>{name}</Text> */}
    </TouchableOpacity>
  )
}

const Item3 = ({ name, desc, date, location, link }) => {
  if(loadingContent){
    return(
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" animating={true} color="blue" />
      </View>
    )
  }
  else{
  return(
  <Card mode="outlined">
  <Card.Content>

      <View style={styles.card}>
      <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={styles.title}>{name}</Text>
      </View>
              <Text style={styles.shortdesc}>{desc}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
                <Icon
                  style={{marginLeft: 5, marginTop: 4}}
                  name='today'
                  color='#00aced' 
                />
                <Text style={styles.shortdesc}>{date}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Icon name="location-pin" color="#00aced"/>
              <Text style={styles.shortdesc}>{location}</Text>
              </View>
              <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor:'#FF7F50', paddingTop:10, marginTop: 10, paddingLeft:20, paddingRight:20, paddingBottom:10, flexDirection: 'row', borderBottomLeftRadius: 15, borderBottomRightRadius: 15}} onPress={()=>navigation.navigate("Events")}>
                  <Text style={{ alignItems: 'center', color:'white', fontWeight:'bold'}}>View</Text>
          </TouchableOpacity>
      </View>
  </Card.Content>
  </Card>
)
}
};
 //users
 const STORE_EMAIL = '@save_email';
 const STORE_PASSWORD = '@save_password';
 const STORE_NAME = '@save_name';
 const STORE_CONTACT = '@save_contact';

  //personal details usestate
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [Name, setName] = useState();
  const [Contact, setContact] = useState();


 const call = async () => {
     try{
         const userEmail = await AsyncStorage.getItem(STORE_EMAIL);
         const userPass = await AsyncStorage.getItem(STORE_PASSWORD);
         const userName = await AsyncStorage.getItem(STORE_NAME);
         const userContact = await AsyncStorage.getItem(STORE_CONTACT);
         if(userEmail !== "" && userPass !== ""){
             setemail(userEmail);
             setpassword(userPass);
             setpassword(userPass);
             setName(userName);
             setContact(userContact);
         }else{
             alert("Please sign in again")
         }
     }
     catch(e){
         console.log(e)
     }
 }

    // const backAction = () => {
    //       Alert.alert("Hold on!", "Are you sure you want to go back?", [
    //         {
    //           text: "Cancel",
    //           onPress: () => null,
    //           style: "cancel"
    //         },
    //         { text: "YES", onPress: () => BackHandler.exitApp() }
    //       ]);
    //       return true;
    //     };
        
     useEffect(() => {
   
      call()

        const s = dbh.collection('schemes').onSnapshot(querySnapshot => {
            const RealSchemes = [];
    
            querySnapshot.forEach(documentSnapshot => {
                RealSchemes.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            setRealSchemes(RealSchemes);
            //console.log(RealSchemes);
        })

        const crpinfo = dbh.collection('mprices').onSnapshot(querySnapshot => {
            const crpinf = [];
    
            querySnapshot.forEach(documentSnapshot => {
                crpinf.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            setcropsInfo(crpinf);
            //console.log(RealSchemes);
        })

        const eventInfo = dbh.collection('events').onSnapshot(querySnapshot => {
          const events = [];
          querySnapshot.forEach(documentSnapshot => {
            events.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
            seteventdata(events);
           setTimeout(() => {
            setloadingContent(false)
           }, 2000);
            // console.log(events);
        })
        
        
    
        // const backHandler = BackHandler.addEventListener(
        //   "hardwareBackPress",
        //   backAction
        // );
    
        // return () => backHandler.remove();

    }, [])
        
    
  
  const renderItem1 = ({ item }) => (
    <Item1 name={item.name} shortdesc={item.shortdesc} link={item.imglink} />
  );
  
  
  const renderItem2 = ({ item }) => (
    <Item2 name={item.name} link={item.link} />
  );

  const renderItem3 = ({ item }) => (
    <Item3 name={item.name} desc={item.desc} date={item.date} location={item.location} link={item.link} />
  );
  
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  const countries = ["Egypt", "Canada", "Australia", "Ireland"]

  return (
    <ScrollView>
    <View>
    <View>
    
    
        <View style={styles.choice}>
          <ScrollView horizontal={true}>  
            <Card mode="outlined" style={styles.cards}>
                <Card.Cover onPartialLoad={<Image style={{width: 60, height: 60}} source={require("../assets/SpinnerGIF.gif")}/>} source={{ uri: 'https://www.latestlaws.com/media/2018/09/Pradhan-Mantri-Kaushal-Vikas-Yojana-PMKVY.png' }} />
            </Card>
            <Card mode="outlined" style={styles.cards}>
                <Card.Cover source={{ uri: 'https://biogenorganics.in/wp-content/uploads/2020/06/pkvy.png' }} />
            </Card>
            <Card mode="outlined" style={styles.cards}>
                <Card.Cover source={{ uri: 'https://i1.wp.com/www.upscsuccess.com/wp-content/uploads/up/2020/05/National-Mission-for-Sustainable-Agriculture-NMSA.jpg?fit=677%2C376&ssl=1' }} />
            </Card>
            <Card mode="outlined" style={styles.cards}>
                <Card.Cover source={{ uri: 'https://www.royalsundaram.in/html/files/crop-insurance/Crop-Insurance-Online.jpg' }} />
            </Card>
            <Card mode="outlined" style={styles.cards}>
                <Card.Cover source={{ uri: 'https://agriverge.in/wp-content/uploads/2020/04/e-nam.png' }} />
            </Card>
            <Card mode="outlined" style={styles.cards}>
                <Card.Cover source={{ uri: 'https://creditcardcustomercares.com/wp-content/uploads/2020/07/kcc-kisan-credit-card.jpg' }} />
            </Card>
          </ScrollView>
        </View>

   
        
    </View>
    <Text style={{alignSelf: 'center'}}>Crops</Text>
    <View style={styles.flat1}>
      <FlatList
          horizontal={true}
          data={cropsInfo}
          renderItem={renderItem2}
          keyExtractor={item => item.key}
        />

    </View>
    <View style={styles.flat}>
    {/* <Text>Schemes</Text> */}
      {/* <FlatList
        data={RealSchemes}
        renderItem={renderItem1}
        keyExtractor={item => item.id}
      /> */}
      <Button onPress={()=>navigation.navigate("Schemes")}>Click here to navigate to Schemes Page</Button>
      
    </View>
    <View style={styles.flat1}>
    <Text>Farming Events</Text>
    
    <FlatList
        data={eventdata}
        renderItem={renderItem3}
        keyExtractor={item => item.key}
      />
      
    </View>
</View>
</ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  cards: {
    height: 200,
    width: 440
  },
  shortdesc: {
    marginLeft: 8,
    marginTop: 5
  },
  flat: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35
  },
  flat1: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 2
  },
  card: {
    backgroundColor: '#FAEBD7',
    marginTop: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4.84,
    elevation: 2,
    marginBottom: 20,
    opacity: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
},
round: {
    width: 60,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    // backgroundColor: 'orange',
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5
},
});

export default Home1;