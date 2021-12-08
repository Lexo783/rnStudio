import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as React from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import movieVue from '../controller/HomeController';

const nav = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="HomeStack" component={movieVue} />
    </Stack.Navigator>
  );
};
const appRouter = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false}}
        name="HomeTab"
        component={nav}
      />
    </Tab.Navigator>
  );
};

export default appRouter;
