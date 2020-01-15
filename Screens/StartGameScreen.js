import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import Card from '../Components/Card';

const StartGameScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}> Start A New Game </Text>

      <Card style={styles.inputcontainer}>
        <Text style={styles.title}>Select A Number: </Text>
        <TextInput />

        <View style={styles.btncontainer}>
          <View>
            <Button title="Reset" onPress={() => {}} />
          </View>
          <View>
            <Button title="Confirm" onPress={() => {}} />
          </View>
        </View>
      </Card>
    </View>
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
    marginVertical: 10,
  },
});

export default StartGameScreen;
