import '@firebase/auth';
import firebase from 'firebase/compat';

export const firebaseConfig = {
  apiKey: 'AIzaSyAf4wMv-dNbio2vA-G0zNyUyZY4u2J8DYw',
  authDomain: 'rnstudio-8757e.firebaseapp.com',
  projectId: 'rnstudio-8757e',
  storageBucket: 'rnstudio-8757e.appspot.com',
  messagingSenderId: '128215361195',
  appId: '1:128215361195:web:5042444d6bf2900e8df9ee',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
