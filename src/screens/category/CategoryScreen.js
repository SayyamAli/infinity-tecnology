import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Card from '../../components/card/Card';
import colors from '../../config/colors';

function CategoryScreen(props) {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <Text style={[style.text, {marginTop: -30}]}>C</Text>
      <Text style={style.text}>A</Text>
      <Text style={style.text}>T</Text>
      <Text style={style.text}>E</Text>
      <Text style={style.text}>G</Text>
      <Text style={style.text}>O</Text>
      <Text style={style.text}>R</Text>
      <Text style={style.text}>Y</Text>
      <View style={style.textBox}></View>
      <View style={style.category}>
        <Card
          title="Mobile"
          icon="cellphone-iphone"
          iconColor={colors.primary}
          elevation={10}
          onPress={() => navigation.navigate('MobileProducts')}
          fontWeight="bold"
          fontSize={20}
          color={colors.darkgrey}
        />
        <Card
          title="Laptop"
          icon="laptop-mac"
          iconColor={colors.primary}
          elevation={10}
          onPress={() => navigation.navigate('LaptopProducts')}
          fontWeight="bold"
          fontSize={20}
          color={colors.darkgrey}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.body,
    flex: 1,
  },
  category: {
    flex: 8,
    marginTop: -700,
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  textBox: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: 20,
  },
  text: {
    color: colors.lightgrey,
    fontWeight: 'bold',
    fontSize: 110,
    marginTop: -60,
  },
});

export default CategoryScreen;
