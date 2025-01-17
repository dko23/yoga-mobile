import React, { useState, useContext, ReactNode } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image } from 'react-native';
import { UserContext } from './context/UserContext';
import meditationImage1 from '../again/images/meditation-1.jpg';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';



const [message, setMessage] = useState('');


interface LoginPageProps {
  navigation: NavigationProp<ParamListBase>;
}
const LoginPage: React.FC<LoginPageProps> = ({ navigation }) => {
const { emailAddress, setEmailAddress, password, setPassword } = useContext<UserContextType>(UserContext);

//** So when using the secureStore, we use the setItemAsync method to store the token in key pair value. That is why in the method it takes a string and the value. */
async function handleSubmit(){
  try {
    const response = await axios.post('/login', {emailAddress, password});
    setMessage(response.data.message);
    const newToken = response.data.token
    await SecureStore.setItemAsync('usertoken', newToken);
  } catch (error) {
    console.error(error);
  }
};

  
  return (
    <View style={styles.container}>
      <Image source={meditationImage1} style={styles.meditation} />
      <Text>Login Page</Text>
      <TextInput
        placeholder="email address"
        onChangeText={(text) => setEmailAddress(text)}
        value={emailAddress}
        style={styles.inputbar}
      />
      {emailAddress === '' && <Text>This is required.</Text>}
      <TextInput
        placeholder="password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        style={styles.inputbar}
      />
      {password === '' && <Text>This is required.</Text>}
      <Button
        title="Submit"
        onPress={handleSubmit}
        disabled={emailAddress === '' || password === ''}
      />
         {message?<Text>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputbar: {
    borderColor: 'teal',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    width: '50%',
  },
  meditation: {
    width: 300,
    height: 300,
    borderRadius: 20,
  
  }
});

export default LoginPage;


