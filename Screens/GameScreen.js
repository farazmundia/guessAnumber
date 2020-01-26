import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import NumberContainer from '../Components/NumberContainer';
import Card from '../Components/Card';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
    const[rounds, setRounds] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver] );
    
    const chooseLowerOrGreater = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) || 
        (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t Lie', 'You know that this is wrong...', [
            { text: 'Sorry', style: 'cancel' }]);
        return;
        }

        if ( direction === 'lower' ) {
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomNumber(currentLow.current , currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
    }
       
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