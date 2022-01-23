import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CategoryScreen from './src/screens/category/CategoryScreen';
import AllLaptopProducts from './src/screens/product/all-laptop-products/all-laptop-products';
import LaptopProducts from './src/screens/product/laptop-products/LaptopProducts';
import MobileProducts from './src/screens/product/mobile-products/MobileProducts';

function CategoryRoutes(props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="CategoryScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="MobileProducts" component={MobileProducts} />

      <Stack.Screen name="LaptopProducts" component={LaptopProducts} />
      <Stack.Screen name="AllLaptopProducts" component={AllLaptopProducts} />
    </Stack.Navigator>
  );
}

export default CategoryRoutes;
