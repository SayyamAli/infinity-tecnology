import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';

function BaseText({icon, ...otherProps}) {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons name={icon} size={30} style={styles.icon} />
      )}
      <TextInput {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 35,
    flexDirection: 'row',
    width: '90%',
    height: 60,
    padding: 10,
    marginVertical: 5,
  },
  icon: {
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    color: colors.darkgrey,
  },

  text: {
    height: 50,
  },
});

export default BaseText;
