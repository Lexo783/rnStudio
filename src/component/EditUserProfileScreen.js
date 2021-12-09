import * as React from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';

const EditUserProfileScreen = props => {
  const {navigation} = props;
  const image = useSelector(s => s.user.image);

  return (
    <SafeAreaView style={styles.profileContainer}>
      <View style={styles.userData}>
        <View style={styles.user}>
          <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
            <Image
              style={styles.userAvatar}
              source={{
                uri: image,
              }}
            />
          </TouchableOpacity>
          <View style={styles.userInfos}>
            <Text style={styles.username}>John Doe</Text>
            <Text style={styles.pseudo}>mail@mail.com</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.editBtn} onPress={() => {}}>
        <Text>Modifier mon profil</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditUserProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userData: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  user: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
    width: 200,
    height: 200,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 150 / 2,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center',
  },
  pseudo: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  rowText: {
    color: '#777777',
  },
  editBtn: {
    backgroundColor: '#23A25C',
    borderRadius: 15,
    padding: 12,
  },
});
