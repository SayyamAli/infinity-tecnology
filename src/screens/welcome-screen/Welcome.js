import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Button,
} from 'react-native';
import APPButton from '../../components/button/APPButton';
import LoginScreen from '../login-screen/LoginScreen';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

function Welcome(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View style={styles.logo}>
        <Image
          resizeMode="contain"
          style={styles.background}
          source={require('../../res/infinitylogo.png')}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        {/* <View style={styles.btns} >
            <Text style={styles.loginButton} >Login</Text>
            <Text style={styles.registerButton}>Register</Text>
        </View> */}
        <APPButton
          title="Login"
          backgroundColor="#137fc2"
          width={'90%'}
          onPress={() => navigation.navigate('LoginScreen')}
        />
        <APPButton
          title="Sign up"
          backgroundColor="#09aae1"
          width={'90%'}
          onPress={() => navigation.navigate('SignUpScreen')}
        />
        <View></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '70%',
    height: '70%',
    position: 'absolute',
    top: 50,
  },

  logo: {
    flex: 1,
    alignItems: 'center',
  },

  btns: {
    alignItems: 'center',
  },

  loginButton: {
    color: '#137fc2',
    fontSize: 30,
    fontWeight: 'bold',
  },
  registerButton: {
    color: '#09aae1',
    fontSize: 30,
    fontWeight: 'bold',
  },

  main: {
    flex: 1,
    backgroundColor: '#e2e2e2',
    flexDirection: 'column',
  },
});

export default Welcome;
