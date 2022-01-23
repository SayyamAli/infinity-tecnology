import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import colors from '../../config/colors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BaseModal from '../../components/BaseModle/BaseModal';

function Orders(props) {
  const [orders, setOrders] = useState();
  const [user, setUser] = useState({});
  const [activity, setActivity] = useState(false);

  useEffect(() => {
    setActivity(true);

    const myData = async () => {
      const snapshot = await firestore()
        .collection('users')
        .doc(user.Email)
        .collection('cart')
        .get();
      setOrders(snapshot.docs.map((doc) => doc.data()));
    };

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

    myData();
    if (user.UserName) {
      setActivity(false);
    }
    return subscriber;
  }, [orders]);

  return (
    <View style={styles.screen}>
      {activity && <ActivityIndicator size="large" color={colors.primary} />}
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="cart-outline"
          size={150}
          style={styles.icon}
          color={colors.white}
        />
        <FlatList
          data={orders}
          keyExtractor={(order) => order.id}
          renderItem={({item}) => (
            <View style={styles.flatListContainer}>
              <Text>{item.title}</Text>
              <Text>{item.price}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: '100%',
                height: 5,
                backgroundColor: colors.primary,
              }}
            />
          )}
        />
      </View>
      <Text>
        <BaseModal
          message="Your order has been placed"
          buttonText="Place Order"
          modalButton="Close"
        />
      </Text>
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
  flatListContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 10,
    paddingLeft: 20,
    overflow: 'hidden',
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

export default Orders;
