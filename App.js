import 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Button, Text} from 'react-native';
import LoginScreen from './src/screens/login-screen/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from './src/screens/welcome-screen/Welcome';
import SignUpScreen from './src/screens/sign-up/SignUpScreen';
import auth from '@react-native-firebase/auth';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'native-base';
import colors from './src/config/colors';
import LoginWelcomeScreen from './src/screens/login-welcome/login-welcome-screen';
import MyProfile from './src/screens/my-profile/my-profile';
import CategoryRoutes from './category-routes';
import Orders from './src/screens/orders/orders';

// firebase.default.initializeApp(firebaseConfig);
const Stack = createStackNavigator();
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    // signOut();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (user) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
            style: {
              position: 'absolute',
              bottom: 10,
              left: 10,
              right: 10,
              elevation: 4,
              backgroundColor: colors.white,
              borderRadius: 30,
              height: 70,
            },
          }}>
          <Tab.Screen
            name="LoginWelcomeScreen"
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <View style={{alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      name="home-outline"
                      size={40}
                      color={focused ? colors.primary : colors.secondary}
                    />
                    <Text>Home</Text>
                  </View>
                );
              },
            }}
            component={LoginWelcomeScreen}
          />
          <Tab.Screen
            name="CategoryRoutes"
            component={CategoryRoutes}
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <View style={{alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      name="shape-outline"
                      size={40}
                      color={focused ? colors.primary : colors.secondary}
                    />
                    <Text>Category</Text>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="MyProfile"
            component={MyProfile}
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <View style={{alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      name="account-circle-outline"
                      size={40}
                      color={focused ? colors.primary : colors.secondary}
                    />
                    <Text>Profile</Text>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Orders"
            component={Orders}
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <View style={{alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      name="cart-outline"
                      size={40}
                      color={focused ? colors.primary : colors.secondary}
                    />
                    <Text>Orders</Text>
                  </View>
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: colors.white,
    borderRadius: 15,
    height: 90,
  },
});
