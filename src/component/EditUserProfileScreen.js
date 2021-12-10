import React from 'react';
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
  const user = useSelector(s => s.user.user);

  console.log('edit profile: ', user);

  return (
    <SafeAreaView style={styles.profileContainer}>
      <View style={styles.userData}>
        <View style={styles.user}>
          <Image
            style={styles.userAvatar}
            source={{
              uri: image
                ? image
                : 'https://icon-library.com/images/icon-spiderman/icon-spiderman-16.jpg',
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => navigation.navigate('Edit')}>
        <Text style={styles.editBtnText}>Modifier mon profil</Text>
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
  editBtn: {
    backgroundColor: '#1F6FEB',
    borderRadius: 15,
    padding: 12,
  },
  editBtnText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
});
