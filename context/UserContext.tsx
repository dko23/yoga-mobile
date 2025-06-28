import React, { ReactNode, createContext, useState, useEffect, useReducer } from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Define User schema
interface User {
  id: number;
  name: string;
  image: any;
  image2?: any;
  time: string;
  poseInfo: string;
}

// Define UserContextType with all properties you need to pass down
interface UserContextType {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  emailAddress: string;
  setEmailAddress: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  users: User[];
  setUsers: (value: User[]) => void;
  StopWatch: React.FC;
  authenticate: {
    signIn: (data: any) => void;
    signOut: () => void;
    signUp: (data: any) => void;
  };
  state: any;
  dispatch: React.Dispatch<any>;
}

// Define children prop interface so basically we are defining a prop
interface ChildrenPropComponents {
  children: ReactNode;
}

// Create UserContext with default type undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<ChildrenPropComponents> = ({ children }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Warrior 2 Pose',
      image: require('../images/result3.png'),
      time: '30secs',
      image2: require('../images/w1.png'),
      poseInfo: `Description: A powerful pose that builds strength and stability...`
    },
    {
      id: 2,
      name: 'Low-Lounge',
      image: require('../images/result4.png'),
      time: '30secs',
      image2: require('../images/low-lunge.png'),
      poseInfo: `Description: A grounding pose that stretches the hips and legs...`
    },
  ]);

  // StopWatch Function
  const StopWatch = () => {
    const [time, setTime] = useState(30);
    const [isRunning, setIsRunning] = useState(false);

    const handleStartStop = () => setIsRunning(!isRunning);
    const handleReset = () => { setIsRunning(false); setTime(30); };

    useEffect(() => {
      let interval;
      if (isRunning && time > 0) {
        interval = setInterval(() => setTime(time - 1), 1000);
      } else if (time <= 0) {
        setIsRunning(false);
      }
      return () => clearInterval(interval);
    }, [isRunning, time]);

    const formatTime = (time) => `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`;

    return (
      <View>
        <Button title={isRunning ? 'Stop' : 'Start'} onPress={handleStartStop} />
        <Text>{formatTime(time)}</Text>
        <Button title="Reset" onPress={handleReset} />
      </View>
    );
  };

  // Reducer and Authentication Setup
 



  // Pass everything to the context
  return (
    <UserContext.Provider value={{
      firstName, setFirstName, lastName, setLastName, emailAddress, setEmailAddress,
      password, setPassword, users, setUsers, StopWatch, authenticate, state, dispatch
    }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };



// const styles = StyleSheet.create({
//   avatar: {
//     width: 300,
//     height: 300,
//     borderRadius: 20,
  
//   },

//   avatar2: {
//     width: 100,
//     height: 100,
//     borderRadius: 20,
//     borderColor: 'pink', // Added to debug
//     borderWidth: 2, // Added to debug
  
//   }
// });

// const iconImage = require('../images/warrior.jpg');
// const iconImage2 = require('../images/warrior-2.jpg');
// const iconImage3 = require('../images/lunge.jpg');

