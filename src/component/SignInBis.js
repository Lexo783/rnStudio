import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import {getSignIn} from '../model/firebase/UserFirebase';

const SignInBis = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSignIn = () => {
    const data = {email, password};
    console.log(data);
    console.log(getSignIn(data));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.elements}>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.text}>Votre Email</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: John"
          onChangeText={email => setEmail(email)}
          textContentType={'emailAddress'}
        />
        <Text style={styles.text}>Votre Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: John"
          onChangeText={password => setPassword(password)}
          secureTextEntry={true}
          textContentType={'password'}
        />
        <Button title="Press me" onPress={() => isSignIn()} />
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
    margin: 30,
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
  input: {
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});

export default SignInBis;
