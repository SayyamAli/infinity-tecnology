import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {BaseButton} from 'react-native-gesture-handler';
import colors from '../../config/colors';
import APPButton from '../button/APPButton';

function ProductCard({title, subtitle, image, onPress}) {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={{width: '100%', height: 200}} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <APPButton
        title="Add to cart"
        backgroundColor={colors.primary}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 10,
    paddingLeft: 20,
    overflow: 'hidden',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkgrey,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default ProductCard;
