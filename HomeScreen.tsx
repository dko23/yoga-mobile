import React from 'react';
import {StyleSheet, View, FlatList, TextInput , Image, TouchableOpacity} from 'react-native';
import { useState, useContext } from 'react';
import DetailScreen from './DetailScreen';
import {UserContext }from './context/UserContext';
import { Searchbar } from 'react-native-paper';
import { Card } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




function HomeScreen({ navigation }) {

  const { users } = useContext(UserContext);// state
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchName, setSearchName] = useState('');

  const showModal = (item) => {
    setSelectedItem(item);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};


 
const newFilteredArray = users.filter((user) => {
if (searchName === '') {
      return user;
    } else if (user.name.toLowerCase().includes(searchName.toLowerCase())) {
      return user;
    }
  }); /// search for style poses


return (
<View style={{ flex: 1 }}>
  <Searchbar
    placeholder="Search Style"
    onChangeText={(text) => setSearchName(text)}
    value={searchName}
  />
  
  <FlatList
    data={newFilteredArray}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <Card>
        <View style={styles.box}>
          <View style={styles.innerBox}>
            <Image source={item.image2} style={{ width: 100, height: 100, borderRadius: 20, borderColor: 'pink',  borderWidth: 2, }} />
            <View style={styles.poseText}>
              <Text>{item.name}</Text>
              <Text>{item.time}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => showModal(item)}>
            <AntDesign name="rightcircleo" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </Card>
    )}
    contentContainerStyle={{ paddingBottom: 20 }} // Add padding if necessary
  />







  

  {/* Modal and Portal components should be placed outside the FlatList */}
  <Portal>
  <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
  {selectedItem ? (
    <>
      <Text>{selectedItem.poseInfo}</Text>
      <Button mode="elevated" onPress={() => {
                navigation.navigate('DetailScreen', {id: selectedItem.id });
              hideModal();              
      }}>
        Start Now
      </Button>
    </>
  ) : (
    <Text>Loading...</Text>
  )}
</Modal>

  </Portal>
</View>

  );
}
const styles = StyleSheet.create({

box: {
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
flexDirection: 'row',
justifyContent: 'space-between'

  },

  innerBox:{
    borderColor: 'green',
    borderWidth: 2,
    flexDirection: 'row',
    width: 200,
    alignItems: 'center',
    padding: 10, 
  },
  poseText:{
    borderColor: 'orange',
    borderWidth: 2,
    marginLeft:20
  },
  
  button: {
    borderColor: 'brown',
    borderWidth: 2,
    marginTop:4
}
});
export default HomeScreen




// function Home({ navigation}) {
    
//   return (
//       <View style={styles.container}>
//           <Text>Home Screen</Text>
      
//       <Button
//           title="Go to Login"
//           onPress={() => navigation.navigate('LoginPage')}
          
//           />
//   </View>
//   )
// }
   
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });

// // export default Home


// 


