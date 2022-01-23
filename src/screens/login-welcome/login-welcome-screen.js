import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View, Text, Image} from 'react-native';
import colors from '../../config/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function LoginWelcomeScreen(props) {
  const [user, setUser] = useState({});
  const [image, setImage] = useState();
  const [activity, setActivity] = useState(false);

  useEffect(() => {
    setActivity(true);
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        (async () => {
          const snapshot = await firestore()
            .collection('users')
            .doc(user.email)
            .get();

          setUser(snapshot.data());
        })();
      } else {
        alert('user is signed out');
      }
    });

    (async () => {
      const image = await firestore()
        .collection('Vector image')
        .doc('image')
        .get();
      setImage(image.data());
    })();
    if (user.UserName) {
      setActivity(false);
    }
    return subscriber; // unsubscribe on unmount
  }, [user]);

  return (
    <View style={styles.mainView}>
      {activity && <ActivityIndicator size="large" color={colors.primary} />}
      <Text style={styles.welcomeText}>Welcome </Text>
      <Text style={styles.userText}>{user.UserName} </Text>
      <Image
        source={require('../../res/Vector1.png')}
        style={{width: '100%', height: 500}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.body,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: colors.darkgrey,
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: -20,
  },
  userText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 40,
  },
});
export default LoginWelcomeScreen;
