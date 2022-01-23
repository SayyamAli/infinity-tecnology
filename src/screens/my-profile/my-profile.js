import {View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import colors from '../../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function MyProfile(props) {
  const [user, setUser] = useState({});
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

    if (user.UserName) {
      setActivity(false);
    }

    return subscriber; // unsubscribe on unmount
  }, [user]);

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View style={styles.screen}>
      {activity && <ActivityIndicator size="large" color={colors.primary} />}
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="account-tie"
          size={150}
          style={styles.icon}
          color={colors.white}
        />
        <Text style={styles.title}>Name</Text>
        <View style={styles.inputCard}>
          <Text style={styles.data}>{user.UserName}</Text>
        </View>
        <Text style={styles.title}>Phone Number</Text>
        <View style={styles.inputCard}>
          <Text style={styles.data}>{user.Phone}</Text>
        </View>
        <Text style={styles.title}>Email</Text>
        <View style={styles.inputCard}>
          <Text style={styles.data}>{user.Email}</Text>
        </View>
      </View>
      <TouchableHighlight
        onPress={() => {
          signOut();
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    top: 20,
  },
  container: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 10,
    paddingBottom: 30,
    paddingLeft: 20,
    overflow: 'hidden',
    width: 350,
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
    left: 10,
    marginTop: 5,
  },

  icon: {
    alignSelf: 'center',
  },
  inputCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    width: 300,
    height: 40,
    top: 5,
    justifyContent: 'center',
  },

  data: {
    left: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 5,
    width: 350,
    top: 20,
  },

  buttonText: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default MyProfile;
