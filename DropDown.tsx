import React, { useState} from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function DropDown() {
    const [visible, setVisible] = useState(false);

    const toggleDropdown = () => {
      setVisible(!visible);
    };
  
    const renderDropdown = () => {
      if (visible) {
        return (
            <Text style={styles.dropdown}>
              This is where information of the pose will be with the time 
            </Text>
        );
      }
    };
    return (
        <TouchableOpacity
            style={styles.button}
            
        onPress={toggleDropdown}>
        <Text>Longe Low </Text>    
        {renderDropdown()}
  
      </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#efefef',
      height: 50,
      width: '90%',
      paddingHorizontal: 10,
      zIndex: 1,
    },
    buttonText: {
      flex: 1,
      textAlign: 'center',
    },
    dropdown: {
      position: 'absolute',
      backgroundColor: '#fff',
      top: 50,
    },
  });

export default DropDown



