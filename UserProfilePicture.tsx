import React, { useState, useContext } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Importing all the exports from 'expo-image-picker' as ImagePicker
// import defaultAvatar from './images/defaultAvatar.jpg';

function UserProfilePicture() {
    const defaultAvatar = require('./images/defaultAvatar.jpg');
    const [image, setImage] = useState(defaultAvatar);
   
   
    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          if (!result.canceled) {
            // setImage(result.assets[0].uri);
            setImage({uri: result.assets[0].uri})
          }
      }; //The launchImageLibraryAsync function opens the image picker and waits for the user to select an image or cancel. The result variable holds an object with details about what the user did. If the user canceled, result.canceled will be true. If the user selected an image, result.canceled will be false, and result.assets will contain an array with details about the selected image(s). eceive all the instructions on how you want the image picker to work.

  return (
      <View>
          <TouchableOpacity onPress={selectImage}>
          {/* <Image source={image === 'string' ? { uri: image } : image} style={styles.avatar} /> */}
           <Image source={image} style={styles.avatar} />
           </TouchableOpacity>
          
  </View>
  )
}

const styles = StyleSheet.create({
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 50,
    }
  });


export default UserProfilePicture

// //   source={{ uri: 'https://example.com/user-profile-picture.jpg' }}
  
