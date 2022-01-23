import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';

function Card({title, iconColor, icon, elevation, onPress, ...otherProps}) {
  return (
    <TouchableHighlight style={style.touch} onPress={onPress}>
      <View style={[style.container, {elevation}]}>
        <MaterialCommunityIcons
          name={icon}
          size={90}
          style={[style.icon, {color: iconColor}]}
        />
        <Text style={{...otherProps}}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: 'center',
    width: 230,
    height: 230,
    justifyContent: 'center',
  },
  touch: {
    borderRadius: 20,
    marginTop: 10,
  },
  icon: {
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
  },
});

export default Card;
