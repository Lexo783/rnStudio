import React, {useCallback, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import configApi from '../model/configApi/configApi';
import {useDispatch, useSelector} from 'react-redux';
import {setLikeData} from '../redux/reducers/LikeReducer';

const DescriptionMovieModal = ({navigation, route}) => {
  const data = route.params.item;
  const dispatch = useDispatch();
  const getLike = useCallback(
    response => {
      dispatch(setLikeData(response));
    },
    [dispatch],
  );
  const like = useSelector(s => s.like.like);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const addLike = id => {
    let newArray = [...like];
    if (like.includes(id)) {
      const index = newArray.indexOf(id);
      newArray.splice(index, 1);
    } else {
      newArray.push(id);
    }
    getLike(newArray);
  };
  /*
  useEffect(() => {
    getLike();
  }, []);*/

  console.log(like);

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
        <Button
          title={like.includes(data.id) ? 'Vous avez likez' : 'Like'}
          onPress={() => addLike(data.id)}
        />
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
