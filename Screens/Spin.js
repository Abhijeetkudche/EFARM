import React from 'react';
import { View, Image } from 'react-native';

const SpinnerWidg = () => {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image 
                style={{width: 60, height: 60}}
                source={require("../assets/SpinnerGIF.gif")}
            />
        </View>
)}

export default SpinnerWidg;