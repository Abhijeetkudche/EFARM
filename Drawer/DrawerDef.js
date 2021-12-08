import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Home from '../Screens/Home';
import LoginEF from '../Screens/Login';
import UpdateProfile from '../Screens/ProfileUpdate';
import VerificationPage from '../Screens/Verification';
import Flat from '../Screens/Flat';
import Schemes from '../Screens/Schemes';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { DrawerContent } from '../Screens/DrawerContent';
import Events from '../Screens/Events';
import ShowExperts from '../Screens/Experts';
import CropViewData from '../Screens/CropsViewData';

const Drawer = createDrawerNavigator();

const DrawerEx = ({ navigation, route }) => {

    return(
        <Drawer.Navigator initialRouteName="Flat" drawerContent={props => <DrawerContent {...props}/>} screenOptions={{
            headerTitleAlign: 'center'
        }}>
            
            <Drawer.Screen name="Home" component={Flat} />
            <Drawer.Screen name="Schemes" component={Schemes} />
            <Drawer.Screen name="Verification" component={VerificationPage} />
            <Drawer.Screen name="Profile" component={UpdateProfile} />
            <Drawer.Screen name="Events" component={Events} />
            <Drawer.Screen name="ShowExperts" component={ShowExperts} />
            <Drawer.Screen name="CropViewData" component={CropViewData} />
        </Drawer.Navigator>
    );
}

export default DrawerEx;