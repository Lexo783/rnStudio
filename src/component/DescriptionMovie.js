import React, {useCallback} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import configApi from '../model/configApi/configApi';

const DescriptionMovieModal = ({navigation, route}) => {
  const data = route.params.item;
  console.log(data);
  console.log(configApi.LESS_IMAGE_ADDRESS + data.poster_path);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1, display: 'flex'}}>
      <View style={{flex: 1, display: 'flex'}}>
        <TouchableOpacity onPress={() => goBack()}>
          <Text>BACK</Text>
        </TouchableOpacity>
        <Image
          source={{
            uri: configApi.LESS_IMAGE_ADDRESS + data.backdrop_path,
          }}
          resizeMode="contain"
          style={{
            height: '50%',
          }}
        />
        <Text>{data.title}</Text>
        <ScrollView>
          <Text>description : {data.overview}</Text>
          <Text>nombre de vote : {data.vote_count}</Text>
          <Text>moyenne : {data.vote_average}</Text>
          <Text>date de création : {data.release_date}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DescriptionMovieModal;
