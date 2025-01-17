import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, Image, KeyboardAvoidingView, Platform, } from 'react-native';
import meditationImage2 from '../again/images/meditation-2.jpg';
import {UserContext} from './context/UserContext';
import { Text, TextInput } from 'react-native-paper';



function SignUp({ navigation }) {
  
interface UserContextType{
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  emailAddress: string;
  setEmailAddress:(value: string) => void;
  password:string;
setPassword:(value: string) => void;
  }  
  const { firstName, setFirstName, lastName, setLastName, emailAddress, setEmailAddress, password, setPassword} = useContext<UserContextType>(UserContext);
  
  
  const handleSubmit = () => {
    navigation.navigate('Welcome');
  };
  
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>
    <View style={styles.container}>
   <Text  variant="displayMedium" style={styles.header}>Welcome to Yoga</Text>
    <Image source={meditationImage2} style={styles.meditation} />
    <TextInput
      placeholder="First name"
      onChangeText={(text) => setFirstName(text)}
      value={firstName}
          style={styles.inputbar}
        mode='outlined'
    
    />
    {firstName === '' && <Text>This is required.</Text>}
    <TextInput
      placeholder="Last name"
      onChangeText={(text) => setLastName(text)}
      value={lastName}
        style={styles.inputbar}
        selectionColor='green'
    />
    {lastName === '' && <Text>This is required.</Text>}
    <Button
      title="Submit"
      onPress={handleSubmit}
      disabled={firstName === '' || lastName === ''}
      />
  </View>
  </KeyboardAvoidingView>  
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
  header: {fontFamily:'Roboto'},
 
  meditation: {
      width: 400,
      height: 240,
      borderRadius: 20,
      borderColor: 'green',
      borderWidth: 2,
  },
    
  inputbar: {
    height: 40,
    // borderBottomWidth: 1,
    marginBottom: 16,
    fontSize: 16,
    width:250,
  },
    });
    
export default SignUp




  



