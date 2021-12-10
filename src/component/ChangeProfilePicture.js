import * as React from 'react';
import {useCallback, useState} from 'react';

import {
  SafeAreaView,
  Image,
  Text,
  View,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {setImageData} from '../redux/reducers/UserReducer';
import {useDispatch, useSelector} from 'react-redux';

const ChangeProfilePicture = ({navigation}) => {
  const [filePath, setFilePath] = useState({});
  const dispatch = useDispatch();
  const getImage = useCallback(
    response => {
      dispatch(setImageData(response));
    },
    [dispatch],
  );
  const image = useSelector(s => s.user.image);

  const updateImage = img => {
    getImage(img);
  };

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const cameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Autorisation requise',
            message:
              "L'application a besoin de votre autorisation pour accéder à votre appareil photo.",
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    } else {
      return true;
    }
  };

  const writeInGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Autorisation requise',
            message:
              "L'application a besoin de votre autorisation pour accéder et modifier votre stockage.",
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const captureImage = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 200,
      maxHeight: 200,
      quality: 1,
      saveToPhotos: true,
    };
    let isCameraPermitted = await cameraPermission();
    let isStoragePermitted = await writeInGalleryPermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, res => {
        if (res.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (res.errorCode === 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (res.errorCode === 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (res.errorCode === 'others') {
          alert(res.errorMessage);
          return;
        }
        console.log(res);
        setFilePath(res);
        updateImage(res.assets[0].uri);
      });
    }
  };

  const chooseFile = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 200,
      maxHeight: 200,
      quality: 1,
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (res.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (res.errorCode === 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (res.errorCode === 'others') {
        alert(res.errorMessage);
        return;
      }
      console.log(res);
      setFilePath(res);
      if(res.assets[0].uri !== []) {  
        updateImage(res.assets[0].uri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Modifier ma photo de profil</Text>
      <View style={styles.editAvatarContainer}>
        <Image source={{uri: image ? image : 'https://icon-library.com/images/icon-spiderman/icon-spiderman-16.jpg'}} style={styles.img} />
        <TouchableOpacity
          style={styles.getImageBtn}
          activeOpacity={0.5}
          onPress={() => captureImage('photo')}>
          <Text>Prendre une photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.getImageBtn}
          activeOpacity={0.5}
          onPress={() => chooseFile('photo')}>
          <Text>Choisir une photo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangeProfilePicture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editAvatarContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFF'
  },
  pathText: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  getImageBtn: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    width: 250,
  },
  img: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
