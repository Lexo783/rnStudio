import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as React from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import Home from '../component/Home';
import SignInBis from '../component/SignInBis';

const nav = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="HomeStack" component={Home} />
    </Stack.Navigator>
  );
};
const appRouter = () => {
  return (
    <SignInBis />
    /*
  <Tab.Navigator>
    <Tab.Screen
      options={{headerShown: false}}
      name="HomeTab"
      component={nav}
    />
  </Tab.Navigator>*/
  );
};

export default appRouter;
