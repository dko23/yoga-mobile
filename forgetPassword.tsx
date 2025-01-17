import React from 'react'
import { View, TextInput, Text, Button, StyleSheet, Image } from 'react-native';
import { UserContext } from './context/UserContext';
import { useContext,useState } from 'react';
import axios from 'axios';

function ForgetPassword() {
  const { emailAddress, setEmailAddress } = useContext(UserContext);
  const [message, setMessage] = useState('');
  

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/reset-password', { emailAddress});
      setMessage(response.data.message); // Success message
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View>
      <Text>Forget password</Text>
      <TextInput
        placeholder="email address"
        onChangeText={(text) => setEmailAddress(text)}
        value={emailAddress}
      />  
      <Text>{message}</Text>
  
      <Button
        title="Submit"
        onPress={handleSubmit}
        disabled={emailAddress === ''}
      />
</View>
  )
}

export default ForgetPassword