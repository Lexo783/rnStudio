import React, {useCallback} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  Button,
  StyleSheet,
} from 'react-native';
import configApi from '../model/configApi/configApi';
import {useDispatch, useSelector} from 'react-redux';
import {setLikeData} from '../redux/reducers/UserReducer';

const DescriptionMovieModal = ({navigation, route}) => {
  const data = route.params.item;
  const dispatch = useDispatch();
  const getLike = useCallback(
    response => {
      dispatch(setLikeData(response));
    },
    [dispatch],
  );
  const like = useSelector(s => s.user.like);

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image
          source={{
            uri: configApi.LESS_IMAGE_ADDRESS + data.backdrop_path,
          }}
          resizeMode="contain"
          style={{
            height: '50%',
          }}
        />
        <ScrollView>
          <Text style={styles.movieTitle}>{data.title}</Text>
          <View style={styles.descMovieContainer}>
            <View style={styles.textInfos}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{data.overview}</Text>
            </View>

            <Button
              title={like.includes(data.id) ? 'Déjà aimé' : 'Aimer'}
              onPress={() => addLike(data.id)}
            />

            <View style={styles.dataNumbers}>
              <View style={styles.infoBox}>
                <Text>Nombre de vote</Text>
                <Text style={styles.numbers}>{data.vote_count}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text>Moyenne</Text>
                <Text style={styles.numbers}>{data.vote_average}</Text>
              </View>
            </View>
          </View>

          <View style={styles.dateInfo}>
            <Text style={styles.date}>
              Date de création : {data.release_date}
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DescriptionMovieModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  movieTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
    padding: 15,
    backgroundColor: '#FFF',
  },
  descMovieContainer: {
    padding: 15,
  },
  textInfos: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    marginVertical: 10,
  },
  infoBox: {
    backgroundColor: '#FFF',
    borderRightColor: '#DDDDDD',
    borderRightWidth: 1,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionTitle: {
    fontWeight: 'bold',
  },
  descriptionText: {
    marginVertical: 10,
  },
  dataNumbers: {
    flexDirection: 'row',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    height: 100,
    marginVertical: 20,
  },
  numbers: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  date: {
    textAlign: 'center',
    color: '#777777',
  },
});
