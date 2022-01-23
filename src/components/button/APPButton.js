import React from 'react';
import {Text, TouchableHighlight, StyleSheet} from 'react-native';
import colors from '../../config/colors';

function APPButton({title, backgroundColor, width, onPress}) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.button, {backgroundColor, width}]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 5,
  },

  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default APPButton;
