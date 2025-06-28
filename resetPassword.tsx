import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, Image, KeyboardAvoidingView, Platform, } from 'react-native';
import { UserContext} from './context/UserContext';
import { Text, TextInput } from 'react-native-paper';
import axios from 'axios'

function resetPassword({ route, navigation }) {

const [message,setMessage]=useState('')
const {password, setPassword } = useContext(UserContext);

// Extract token from route parameters (React Navigation)
  const { token } = route.params; 


    //handle the error of the password
    const renderPasswordError = () => {
        if (password === '') {
            return <Text>This is required.</Text>;
        }
        if (password.length < 6) {
            return <Text>Password must contain at least 6 characters.</Text>;
        }
        if (!/\d/.test(password)) {
            return <Text>Password must contain at least one number.</Text>;
        }
        if (!/[A-Z]/.test(password)) {
            return <Text>Password must contain at least one uppercase letter.</Text>;
        }
        if (!/[a-z]/.test(password)) {
            return <Text>Password must contain at least one lowercase letter.</Text>;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return <Text>Password must contain at least one special character.</Text>;
        }
        return null;  // No error
    };
    

    const handleSubmit = async () => {
        try {
          const response = await axios.post('/reset-password', { password, token });
          setMessage(response.data.message); // Success message
        } catch (error) {
          setMessage('Failed to reset password. Please try again.');
          console.error(error);
        }
      };

  return (
      <div>
          
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View style={styles.container}>
                <Text variant="displayMedium" style={styles.header}>Password</Text>

<TextInput
placeholder="password"
onChangeText={(text) => setPassword(text)}
value={password}
style={styles.inputbar}
mode='outlined'
secureTextEntry={true}  // This hides the password input
                />
<Text>{renderPasswordError()}</Text>
                  {message ? <Text>{message}</Text> : null}
                  
                <Button
                    title="Submit"
                    onPress={handleSubmit}
                />
            </View>
        </KeyboardAvoidingView>

    </div>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: { fontFamily: 'Roboto' },

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
        width: 250,
    },
});
export default resetPassword







