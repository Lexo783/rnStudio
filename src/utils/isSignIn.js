import React, {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
//import {initializeApp} from 'firebase/app';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../redux/reducers/user-reducer';

const IsSignIn = () => {
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();
  const user1 = useSelector(s => s.user.user);
  //const [user, setUser] = useState();

  console.log(user1);
  const getUser = useCallback(
    response => {
      dispatch(setUserData(response));
    },
    [dispatch],
  );

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
    getUser(JSON.stringify(data));
    //setUser(data);
  };

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }
  return user1 === null ? null : user1;
};

export default IsSignIn;