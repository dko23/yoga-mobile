import React, { useContext } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import {UserContext}from './context/UserContext';
import UserProfilePicture from './UserProfilePicture';

function UserProfile() {
  const {firstName} = useContext(UserContext);

  return (
    <View >
      <Text style={styles.welcomeText}>Welcome{firstName}!</Text>
      <UserProfilePicture/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  welcomeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default UserProfile;
