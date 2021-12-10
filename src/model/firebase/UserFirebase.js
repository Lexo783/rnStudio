import {firebase} from './Firebase';

async function getSignIn(values) {
  const data = {email: values.email, password: values.password};
  return firebase
    .auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(response => {
      return response.user;
    })
    .catch(error => {
      return error;
    });
}

async function registerUser(values) {
  const data = {email: values.email, password: values.password};

  return firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then(userCredential => {
      console.log(userCredential.user);
      return userCredential.user;
    })
    .catch(error => {
      return error.code;
    });
}

export {getSignIn, registerUser};
