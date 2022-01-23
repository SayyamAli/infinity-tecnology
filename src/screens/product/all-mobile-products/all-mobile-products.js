import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import ProductCard from '../../../components/card/product-card';
import {myname as myMobile} from '../../../components/listing-component/LaptopAppListing';
import colors from '../../../config/colors';
import firestore from '@react-native-firebase/firestore';

function AllMobileProducts(props) {
  let title = '' + myMobile;
  const [mobiles, setMobiles] = useState();
  const [user, setUser] = useState({});
  const [activity, setActivity] = useState(false);

  useEffect(() => {
    setActivity(true);

    const myData = async () => {
      const snapshot = await firestore().collection(myMobile).get();
      setMobiles(snapshot.docs.map((doc) => doc.data()));
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

    if (mobiles) {
      setActivity(false);
    }
  }, [mobiles]);
  const addOrders = firestore()
    .collection('users')
    .doc(user.Email)
    .collection('cart');

  return (
    <View style={styles.conatiner}>
      {activity && <ActivityIndicator size="large" color={colors.primary} />}
      <FlatList
        data={mobiles}
        keyExtractor={(laptops) => laptops.id}
        renderItem={({item}) => (
          <ProductCard
            title={item.title}
            subtitle={item.price}
            image={item.image}
            onPress={() => {
              alert('This item has added to your cart.');
              addOrders
                .add({
                  title: item.title,
                  price: item.price,
                })
                .then(() => {
                  console.log('user added');
                });
            }}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: '100%',
              height: 5,
              backgroundColor: colors.body,
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: colors.body,
    padding: 20,
  },
});

export default AllMobileProducts;
