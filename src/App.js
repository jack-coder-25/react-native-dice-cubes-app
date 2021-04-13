import React, { useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, Text, Image } from 'react-native';
import RNShake from 'react-native-shake';

const diceImages = [
  require('./assets/dice-1.png'),
  require('./assets/dice-2.png'),
  require('./assets/dice-3.png'),
  require('./assets/dice-4.png'),
  require('./assets/dice-5.png'),
  require('./assets/dice-6.png')
];

const App = () => {
  const [dices, setDices] = useState([0, 1]);
  const [total, setTotal] = useState(null);

  const showRandomDice = () => {
    const dice1 = Math.floor(Math.random() * 5);
    const dice2 = Math.floor(Math.random() * 5);
    setDices([dice1, dice2]);
    setTotal(dice1 + 1 + dice2 + 1);
  };

  useEffect(() => {
    RNShake.addEventListener('ShakeEvent', showRandomDice);
    return () => RNShake.removeEventListener('ShakeEvent');
  });

  return (
    <View style={styles.container} onTouchEnd={showRandomDice}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View />

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={diceImages[dices[0]]} />
        <Image style={styles.image} source={diceImages[dices[1]]} />
      </View>

      <Text style={styles.bottomText}>{total || 'Tap Or Shake'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between'
  },
  imageContainer: { display: 'flex', alignItems: 'center' },
  image: { height: 125, width: 125, marginBottom: 30 },
  bottomText: {
    color: 'rgb(129,129,129)',
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 40
  }
});

export default App;
