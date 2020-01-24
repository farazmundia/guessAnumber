import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import Card from '../Components/Card';
import Colors from '../Contants/Colors';
import Input from '../Components/Input';
import NumberContainer from '../Components/NumberContainer';

const StartGameScreen = props => {
  
  const [enterValue, setEnterValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const inputHandler = inputText => {
    setEnterValue(inputText.replace(/[^0-9]/g, ''))
  }

  const resetinputHandler = () => {
    setEnterValue('');
    setConfirmed(false);
  }

  const confirmHandler = () => {
    const chosenNumber = parseInt(enterValue);
    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid Number', 'Number has to be a number betweeen 1 to 99.', 
      [{text: 'Okay', style: 'destructive', onPress: resetinputHandler}]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnterValue('');
    Keyboard.dismiss()
  }

  let confirmOutput;

  if(confirmed) {
    confirmOutput = ( 
    <Card style={styles.summaryContainer}>
      <Text style={styles.selectedtitle}>
        You Selected:
      </Text>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <Button color={Colors.primary} title="START GAME" 
      onPress={() => props.onStartGame(selectedNumber)} />
    </Card>
    );
  }
 
  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
    <View style={styles.screen}>
      <Text style={styles.title}> Start A New Game </Text>

      <Card style={styles.inputcontainer}>
        <Text style={styles.title}>Select A Number: </Text>
        <Input style={styles.input} 
        blurOnSubmit 
        autoCapitalize="none" 
        autoCorrect={false} 
        keyboardType="numeric" 
        maxLength={2}
        value={enterValue}
        onChangeText= {inputHandler} 
        />
        <View style={styles.btncontainer}>
          <View style={styles.Button}>
            <Button title="Reset" color={Colors.accent} onPress={resetinputHandler} />
          </View>
          <View style={styles.Button}>
            <Button title="Confirm" color={Colors.primary} onPress={confirmHandler} />
          </View>
        </View>
      </Card>
      {confirmOutput}
    </View> 
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  inputcontainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  btncontainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    marginTop: 10
  },
  Button: {
    width: 95,
  },
  input: {
    width: 80,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
    padding: 20
  }, 
  selectedtitle: {
    fontSize: 20,
  }
});

export default StartGameScreen;
