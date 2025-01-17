import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React, { useState, useContext } from 'react';
import { UserContext } from './context/UserContext';

function DetailScreen({ route, navigation }) {
    const { id } = route.params;  // Retrieve the passed id
    const { users, StopWatch } = useContext(UserContext);  // Access the users array from context
    
    // Find the object corresponding to the id
    const poseInfo = users.find((user) => user.id === id);
    console.log(poseInfo)
   
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Details Screen</Text>
    <Text>{poseInfo.name}</Text>
    <Image source={poseInfo.image} style={{ width: 300, height: 300, borderRadius: 20 }} />
    <Text>{poseInfo.time}</Text>
    <StopWatch />    
      <Button title="Go to Home" onPress={() => navigation.navigate('HomeScreen')} /> 
    </View>
  );
}

export default DetailScreen


// import { StyleSheet, Text, View, Button } from 'react-native';
// import React, { useEffect } from 'react';

// function DetailScreen({ route}) {
//     const { item } = route.params;
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Details Screen</Text>
//             <Text>{item.name}</Text>
//             <Text>{item.image}</Text>
//         <Text>{item.time}</Text>
//         <Text>{item.test}</Text>
//         </View>
//     );
// }

// export default DetailScreen;

          // const {users} = useContext(UserContext);
            
       {/* <Text>Details Screen</Text>
        <Text>{userInfo.name}</Text>
        <Text>{userInfo.image}</Text>
            <Text>{userInfo.test}</Text> */}
  