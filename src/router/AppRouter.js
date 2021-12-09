import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as React from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import MovieVue from '../component/Home';

import isSignIn from '../utils/isSignIn';
import SignIn from '../component/SignIn';
import Register from '../component/Register';

const nav = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="HomeStack" component={MovieVue} />
    </Stack.Navigator>
  );
};
const NavAuth = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Auth">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
const appRouter = () => {
  console.log(isSignIn());
  return isSignIn() != null ? (
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false}}
        name="HomeTab"
        component={nav}
      />
    </Tab.Navigator>
  ) : (
    <NavAuth />
  );
};

export default appRouter;
