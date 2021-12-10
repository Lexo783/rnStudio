import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import {getSignIn} from '../model/firebase/UserFirebase';
import {useDispatch} from 'react-redux';
import {setUserData} from '../redux/reducers/UserReducer';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const getUser = useCallback(
    response => {
      dispatch(setUserData(response));
    },
    [dispatch],
  );

  const firebaseSignIn = async () => {
    const data = {email, password};
    //return user
    const user = await getSignIn(data);
    console.log(user);
    if (user.code) {
      setError(true);
      return;
    }
    getUser(JSON.stringify(user));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.elements}>
        <Text style={styles.title}>Connexion</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Votre Email</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: John@mail.com"
            onChangeText={email => setEmail(email)}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType={'emailAddress'}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.text}>Votre Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            onChangeText={password => setPassword(password)}
            secureTextEntry={true}
            autoCapitalize="none"
            textContentType={'password'}
          />
        </View>

        <View style={styles.authBtn}>
          <Button title="Connexion" onPress={() => firebaseSignIn()} />
        </View>
        <View style={styles.authBtn}>
          <Button
            title="Inscription"
            onPress={() => navigation.push('Register')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  elements: {
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 20,
    fontSize: 40,
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
  },
  inputContainer: {
    margin: 5,
  },
  input: {
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  authBtn: {
    margin: 5,
  },
});

export default SignIn;
