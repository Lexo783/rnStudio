import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as React from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import MovieVue from '../controller/HomeController';

import isSignIn from '../utils/isSignIn';
import GoogleSignIn from '../customJSX/SignIn';

const nav = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="HomeStack" component={MovieVue} />
    </Stack.Navigator>
  );
};
const appRouter = () => {
  return isSignIn() != null ? (
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false}}
        name="HomeTab"
        component={nav}
      />
    </Tab.Navigator>
  ) : (
    <GoogleSignIn />
  );
};

export default appRouter;
