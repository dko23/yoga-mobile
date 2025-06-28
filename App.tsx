import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import LoginPage from './LoginPage';
import Welcome from './Welcome';
import DetailScreen from './DetailScreen';
import React, { useState, useReducer, useContext, useEffect} from 'react';
import UserProfile from './UserProfile';
import { UserProvider, UserContext } from './context/UserContext';
import StopWatch from './StopWatch';
import { PaperProvider } from 'react-native-paper';
import SignUp from './SignUp';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import resetPassword from './resetPassword';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {

const [isLoading, setIsLoading ]= useState(true);
const [isSignout, setSignOut ]= useState(true)
const [userToken, setUserToken ]= useState(null);


  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let retrieveUserToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
         retrieveUserToken = await SecureStore.getItemAsync('usertoken');// the 'usertoken' is the key string that identifies the value or token
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(retrieveUserToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <PaperProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {userToken == null ? (<>
              <Stack.Screen name='LoginPage' component={LoginPage} />
              <Stack.Screen name='SignUp' component={SignUp} />
              <Stack.Screen name='ResetPassword'component={resetPassword} />
            </>) :
              (<Stack.Screen name='Home' component={HomeScreen} />)}
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </PaperProvider>
  );

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}








// screenOptions={{ headerStyle: {backgroundColor: 'teal',}, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold'},}}initialRouteName='HomeScreen'
///stacks are here
//       <Tab.Navigator screenOptions={{ headerShown: false,}}>
//       <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{
//     tabBarIcon: ({ color, size }) => (
//           <MaterialCommunityIcons name="yoga" size={40} color="black" />
//     ),
//   }}/>
//       <Tab.Screen name="SettingsStack" component={SettingsStackScreen} />
// </Tab.Navigator>

{/* <Stack.Screen
  name="Welcome"
  component={Welcome}
  options={{
    headerRight: () => <UserProfile />,
  }}
          /> */}

          //stack navigator
// function HomeStackScreen() {
//   return (
// <Stack.Navigator
// screenOptions={{
// headerStyle: {
//   backgroundColor: 'teal',},
// headerTintColor: '#fff',
// headerTitleStyle: {
//   fontWeight: 'bold'
//         },
// }}
// // initialRouteName='HomeScreen'
// > 
// <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       <Stack.Screen name="DetailScreen" component={DetailScreen} />

// </Stack.Navigator>
//   );
// }
//then Tab Navigator


// //Checking Another Screen to see if it works
// function SettingsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings screen</Text>
//       <Button
//         title="Go to Home"
//         onPress={() => navigation.navigate('HomeStack')}
//       />
//     </View>
//   );
// }

// function SettingsStackScreen() {
//   return (
//     <SettingsStack.Navigator>
//       <SettingsStack.Screen name="Settings" component={SettingsScreen} />
//     </SettingsStack.Navigator>
//   );
// }
