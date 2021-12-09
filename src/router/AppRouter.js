import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as React from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import movieVue from '../controller/HomeController';
import ProfileScreen from '../controller/EditUserProfileScreen';
import changeProfilePicture from "../controller/ImagePicker";


const nav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
      <Stack.Screen name="HomeStack" component={movieVue} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Edit" component={changeProfilePicture} />
    </Stack.Navigator>
  );
};
const appRouter = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{headerShown: false}} name="HomeTab" component={nav} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default appRouter;
