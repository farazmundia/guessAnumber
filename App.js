import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import Header from './Components/Header';
import StartGameScreen from './Screens/StartGameScreen';
import GameScreen from './Screens/GameScreen';
import GameOver from './Screens/GameOver';

export default function App() {

  const[userNumber, setUserNumber] = useState();
  const[guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numberOfRounds => {
    setGuessRounds(numberOfRounds);
  };

  const configureNewGame = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }
  
  let content = <StartGameScreen onStartGame={startGameHandler}/>

  if(userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  }else if (guessRounds > 0 ) {
    content = <GameOver roundsNumber={guessRounds} userNumber= {userNumber} onRestart={configureNewGame}/>
  } 

  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      {content} 
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
