import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useSelector} from 'react-redux';

const IsSignIn = () => {
  const [initializing, setInitializing] = useState(true);
  const user = useSelector(s => s.user.user);
  console.log('Is sign in : ', user);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '128215361195-q1939jrqnquclr566lqh53t82t4fec15.apps.googleusercontent.com',
      offlineAccess: true,
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
    //getUser(JSON.stringify(data));
    //setUser(data);
  };

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }
  return user === null ? null : user;
};

export default IsSignIn;
