/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import GoogleSignIn from './src/component/SignIn';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import Register from './src/component/Register';

const App: () => Node = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '128215361195-q1939jrqnquclr566lqh53t82t4fec15.apps.googleusercontent.com',
    });
  }, []);
  // Handle user state changes
  const onAuthStateChanged = data => {
    if (initializing) {
      setInitializing(false);
    }

    if (!data) {
      return;
    }
    setUser(data);
  };

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  // if (!user) {
  //   return (
  //     <NavigationContainer>
  //       <AppRouter />
  //     </NavigationContainer>
  //     /*
  //     <SafeAreaView>
  //       <View>
  //         <GoogleSignIn />
  //       </View>
  //     </SafeAreaView>
  //      */
  //  );
  /*
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  );*/
  return <Register />;
};

export default App;
