import React, { ReactNode, createContext, useState, useEffect, useReducer } from 'react'; /// create the context, basically serves as a container for the data 
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';


//for basically schema for each element in the array
interface User {
  id: number;
  name: string;
  image: any; // You might replace `any` with a more specific type if needed
  image2?: any; // Optional property
  // test?: ReactNode;
  time: string;
  poseInfo:string
}

interface UserContextType {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  emailAddress: string;
  setEmailAddress:(value: string) => void;
  password:string;
setPassword:(value: string) => void;
  users: User[];
  setUsers: (value: User[]) => void;
  StopWatch: React.FC;
  authenticate: React.FC
}      // this is used to define the type that the variable/object should conform to
  
interface ChildrenPropComponents{
  children:ReactNode // basically any content that can be rendered by the react component. In React, "any content that can be rendered by a React component" refers to various types of values and elements that a React component can produce as output to be displayed on the web page. 
}
  
const UserContext = createContext<UserContextType | undefined>(undefined);


const UserProvider: React.FC<ChildrenPropComponents> = ({ children}) => {
const [firstName, setFirstName] = useState<string>('');
const [lastName, setLastName] = useState<string>('');
const [emailAddress, setEmailAddress] = useState<string>('');
const [password, setPassword] = useState <string>('');
const [users, setUsers] = useState<User[]>([
  {
    id: 1,
    name: 'Warrior 2 Pose',
    // image: require('../images/warrior.jpg'),
    image: require('../images/result3.png'),
    time: '30secs',
    // image2: <Image source={iconImage2} style={styles.avatar2} />,
    image2: require('../images/w1.png'),
    // test: <StopWatch />,
    poseInfo: `
    Description: A powerful pose that builds strength and stability.
    
    Key Points:
    - Feet: Wide apart; right foot facing forward, left foot angled.
    - Knee: Bend the front knee, aligned with ankle.
    - Arms: Extend parallel to the floor.
    - Gaze: Look over your front hand.
      `
  },
  {
    id: 2,
    name: 'Low-Lounge',
    image: require('../images/result4.png'),
    // test: <StopWatch />,
    image2: require('../images/low-lunge.png'),
    time: '30secs',
    poseInfo: `
   Description:
A grounding pose that stretches the hips and legs while improving balance and stability.

Key Points:

Front Leg: Bend the front knee, ensuring it’s directly over the ankle.
Back Leg: Extend the back leg straight with the top of the foot pressing into the floor.
Hips: Lower your hips toward the floor to deepen the stretch.
Torso: Keep your torso upright, or you can optionally lift your arms overhead for added stretch.
      `
  },
]);


///StopWatch Function 
const StopWatch = () => {
const [time, setTime] = useState(30);
const [isRunning, setIsRunning] = useState(false);
    
const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(30);
  };
  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time <= 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);
    
    const formatTime = (time) => {
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
      };    
      
      return (
        <View>          
    <Button
          title= { isRunning? 'Stop': 'Start' }
          onPress={handleStartStop}
        />  
<Text>{formatTime(time)}</Text>
          <Button
          title="Reset"
          onPress={handleReset}
        />  
        </View>
         
      );
}
  ///end of StopWatch Function
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );


  
  const initialState = { isLoading: true, isSignout: false, userToken: null }
  
  function authReducer(prevState, action) {
    switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
          case 'SIGN_IN':
            return {
              ...prevState,
              isSignout: false,
              userToken: action.token,
        };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
      };
    }
  }
  
  const [state, dispatch] = useReducer(authReducer, initialState);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authenticate = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
 
return (
    <UserContext.Provider value={{firstName, setFirstName, lastName, setLastName, users, setUsers, StopWatch, emailAddress, setEmailAddress, password, setPassword, authenticate, state, dispatch}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };