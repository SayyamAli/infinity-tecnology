import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import colors from '../../config/colors';
import BaseText from '../../components/base-text/BaseText.';
import APPButton from '../../components/button/APPButton';
import {useNavigation} from '@react-navigation/core';
import auth from '@react-native-firebase/auth';

function LoginScreen(props) {
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();

  const signIn = () => {
    if (Email === undefined) {
      alert('Email is empty.');
    } else if (Password === undefined) {
      alert('Password is empty.');
    } else {
      auth()
        .signInWithEmailAndPassword(Email, Password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-email') {
            alert('The email address is badly formatted.');
          } else if (error.code === 'auth/user-not-found') {
            alert('There is no user record corresponding to this email.');
          } else if (error.code === 'auth/wrong-password') {
            alert('The password is invalid');
          } else {
            alert(error);
          }
        });
    }
  };
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.mainView}>
        <Image
          style={styles.logo}
          source={require('../../res/infinitylogo.png')}
        />
        <BaseText
          icon="email"
          placeholder="Email"
          onChangeText={(email) => {
            setEmail(email);
          }}
        />
        <BaseText
          icon="lock"
          placeholder="Passsword"
          secureTextEntry={true}
          onChangeText={(password) => {
            setPassword(password);
          }}
        />
        <APPButton
          title="Login"
          backgroundColor={colors.primary}
          width={'90%'}
          onPress={() => {
            signIn();
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.body,
  },

  logo: {
    width: 230,
    height: 230,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },

  mainView: {
    alignItems: 'center',
  },

  btn: {
    width: '100%',
  },
});
export default LoginScreen;
