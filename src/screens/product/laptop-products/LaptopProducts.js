import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LaptopAppListing from '../../../components/listing-component/LaptopAppListing';
import colors from '../../../config/colors';
import firestore from '@react-native-firebase/firestore';

function LaptopProducts(props) {
  const [laptops, setLaptops] = useState();
  const [activity, setActivity] = useState(false);

  useEffect(() => {
    setActivity(true);

    const myData = async () => {
      const snapshot = await firestore().collection('Laptops').get();
      setLaptops(snapshot.docs.map((doc) => doc.data()));
    };

    myData();
    if (laptops) {
      setActivity(false);
    }
  }, [laptops]);

  return (
    <View style={style.container}>
      {activity && (
        <ActivityIndicator
          style={{alignSelf: 'center'}}
          size="large"
          color={colors.primary}
        />
      )}
      <FlatList
        data={laptops}
        keyExtractor={(laptops) => laptops.id}
        renderItem={({item}) => (
          <LaptopAppListing title={item.title} icon="laptop-mac" />
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
    bottom: 10,
  },
});

export default LaptopProducts;
