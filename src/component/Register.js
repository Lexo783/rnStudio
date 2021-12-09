import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import {registerUser} from '../model/firebase/UserFirebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    const data = {email, password};
    console.log(registerUser(data));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.elements}>
        <Text style={styles.title}>Inscription</Text>
        <Text style={styles.text}>Votre Email</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: John"
          onChangeText={email => setEmail(email)}
          r
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
        <Button title="Press me" onPress={() => register()} />
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

export default Register;
