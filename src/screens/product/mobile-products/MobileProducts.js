import {FlatList, ActivityIndicator, View, StyleSheet} from 'react-native';
import MobileAppListing from '../../../components/listing-component/LaptopAppListing';
import colors from '../../../config/colors';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

function MobileProducts(props) {
  const [mobiles, setMobiles] = useState();
  const [activity, setActivity] = useState(false);

  useEffect(() => {
    setActivity(true);

    const myData = async () => {
      const snapshot = await firestore().collection('Mobile').get();
      setMobiles(snapshot.docs.map((doc) => doc.data()));
    };

    myData();
    if (mobiles) {
      setActivity(false);
    }
  }, [mobiles]);

  return (
    <View style={style.container}>
      {activity && <ActivityIndicator size="large" color={colors.primary} />}
      <FlatList
        data={mobiles}
        keyExtractor={(message) => message.id}
        renderItem={({item}) => (
          <MobileAppListing title={item.title} icon="cellphone-iphone" />
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

const style = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default MobileProducts;
