import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import Colors from '../Contants/Colors';

const GameOver = props => {
    return (
        <View style={styles.screen}>
            <Text> The Game is Over </Text>
            <View style={styles.imageContainer}>
            <Image 
            style={styles.image} 
            source={require('../assets/Images/success.png')} 
            resizeMode="cover"
            />
            </View>
            <Text> Number Of Rounds: {props.roundsNumber} </Text>
            <Text> User Number: {props.userNumber} </Text>
            <Button title="New Game" color={Colors.primary} onPress={props.onRestart} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderColor: 'black',
        borderWidth: 5,
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default GameOver;


