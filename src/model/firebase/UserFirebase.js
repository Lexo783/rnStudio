import {firebase} from './Firebase';

async function getSignIn(values) {
  const data = {email: values.email, password: values.password};
  console.log('signIn');
  firebase
    .auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(response => {
      console.log(response);
      if (response.user) {
        return response.user;
      }
    })
    .catch(error => {
      console.log(error);
    });
}

async function registerUser(values) {
  const data = {email: values.email, password: values.password};

  console.log('register');
  firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then(userCredential => {
      console.log(userCredential.user);
      return userCredential.user;
    })
    .catch(error => {
      console.log(error.code);
      console.log(error.message);
    });
}

export {getSignIn, registerUser};
