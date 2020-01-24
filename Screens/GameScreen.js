import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import NumberContainer from '../Components/NumberContainer';
import Card from '../Components/Card';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const rndNum = Math.floor(Math.random() * ( max - min )) + min;

    if(rndNum === exclude) {
        return generateRandomNumber(min, max, exclude);
    }else{
        return rndNum;
    }
}

const GameScreen = props => {
    const[currentGuess, setCurrentGuess] = useState(generateRandomNumber(1,100,props.userChoice));
    return (    
        <View style={styles.screen}>
            <Text> Opponent's Guess </Text>
            <NumberContainer> {currentGuess} </NumberContainer>
        
            <Card style={styles.buttoncontainer}>
                <Button color={Colors.primary} title="LOWER" onPress={() => {}}/>
                <Button color={Colors.primary} title="GREATER" onPress={() => {}}/>   
            </Card>
        </View>
    );
};

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttoncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: "80%",
        padding: 20
    }

}); 