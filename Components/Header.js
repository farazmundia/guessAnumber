import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../Contants/Colors';

const Header = props => {
  return (
    <View style={styles.Header}>
      <Text style={styles.Headertitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    width: '100%',
    height: 70,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Headertitle: {
    color: 'black',
    fontSize: 18,
  },
});

export default Header;
