import {Text, View, Button} from 'react-native';
import React, { useState} from 'react';

function CounterFunction() {
    const [count, setCount] = useState(0)
    function IncreaseCount() {
        setCount(count + 1);
    }
  return (
      <View>
          <Text>Testing Function</Text>
          <Text>{count}</Text>
          <Button
        title="Press count"
        onPress={IncreaseCount}
      />
    </View>
  )
}

export default CounterFunction