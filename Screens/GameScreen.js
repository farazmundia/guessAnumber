import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert, ScrollView} from 'react-native';
import NumberContainer from '../Components/NumberContainer';
import Card from '../Components/Card';
import Colors from '../Contants/Colors';

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return rndNum;
  }
};

renderListitem = (value, numberOfrounds) => (
  <View key={value + 1} style={styles.listitem}>
    <Text style={styles.listitems}>#{numberOfrounds}</Text>
    <Text style={styles.listitems}>{value}</Text>
  </View>
);

const GameScreen = props => {
  const initialguess = generateRandomNumber(1, 100, props.userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialguess);
  const [pastGuesses, setpastGuesses] = useState([initialguess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const {userChoice, onGameOver} = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const chooseLowerOrGreater = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie", 'You know that this is wrong...', [
        {text: 'Sorry', style: 'cancel'},
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    setpastGuesses(currentPassGuesses => [nextNumber, ...currentPassGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text> Opponent's Guess </Text>
      <NumberContainer> {currentGuess} </NumberContainer>

      <Card style={styles.buttoncontainer}>
        <Button
          color={Colors.primary}
          title="LOWER"
          onPress={chooseLowerOrGreater.bind(this, 'lower')}
        />
        <Button
          color={Colors.primary}
          title="GREATER"
          onPress={chooseLowerOrGreater.bind(this, 'greater')}
        />
      </Card>
      <View style={styles.viewOfList}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListitem(guess, pastGuesses.length - index),
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttoncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
    padding: 20,
  },
  listitem: {
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  viewOfList: {
    flex: 1,
    width: '80%',
  },
  listitems: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
