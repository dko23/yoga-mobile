import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, Image, KeyboardAvoidingView, Platform, } from 'react-native';
import { UserContext } from './context/UserContext';
import { Text, TextInput } from 'react-native-paper';
import axios from 'axios';


function SignUpDetails({ navigation }) {

    interface UserContextType {
        firstName: string;
        setFirstName: (value: string) => void;
        lastName: string;
        setLastName: (value: string) => void;
        emailAddress: string;
        setEmailAddress: (value: string) => void;
        password: string;
        setPassword: (value: string) => void;
    }
    const { firstName, setFirstName, lastName, setLastName, emailAddress, setEmailAddress, password, setPassword } = useContext<UserContextType>(UserContext);

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


    ///this is where we would making the API Call to the server to take in the details.
    const handleSubmit = async () => {
        try {
            const response = await axios.post('/signup', { firstName, lastName, emailAddress, password });
            console.log(response.data);
            // Handle successful signup (e.g., show success message, redirect)
        } catch (error) {
            console.log(error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View style={styles.container}>
                <Text variant="displayMedium" style={styles.header}>Sign Up</Text>
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
                
    
<TextInput
    placeholder="email address"
    onChangeText={(text) => setEmailAddress(text)}
    value={emailAddress}
    style={styles.inputbar}
    mode='outlined'
/>
{emailAddress === '' ? 
    <Text>This is required.</Text> 
    : 
    (!emailAddress.match(/\S+@\S+\.\S+/) && <Text>Email address is invalid</Text>)
}
                

<TextInput
placeholder="password"
onChangeText={(text) => setPassword(text)}
value={password}
style={styles.inputbar}
mode='outlined'
secureTextEntry={true}  // This hides the password input
                />
{renderPasswordError()}
        

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

export default SignUpDetails






