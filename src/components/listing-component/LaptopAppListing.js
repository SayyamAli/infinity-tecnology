import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import {set} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';

export let myname = '';
function LaptopAppListing({title, icon}) {
  const [haza, setHaza] = useState();
  useEffect(() => {
    myname = haza;
  });

  const navigation = useNavigation();
  return (
    <TouchableHighlight
      onPress={() => {
        setHaza(title);
        navigation.navigate('AllLaptopProducts');
      }}>
      <View style={styles.list}>
        <MaterialCommunityIcons name={icon} size={50} style={[styles.icon]} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.chevronContainer}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            style={styles.chevron}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = new StyleSheet.create({
  list: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: colors.darkgrey,
    paddingLeft: 10,
  },

  icon: {
    color: colors.primary,
  },

  chevronContainer: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 15,
  },

  chevron: {
    alignSelf: 'flex-end',
    color: colors.darkgrey,
  },
});

export default LaptopAppListing;
