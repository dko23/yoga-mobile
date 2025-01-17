import React from 'react'
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

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

export default StopWatch

