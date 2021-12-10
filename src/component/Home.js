import React, {useState, useEffect, useCallback, useMemo} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
  TextInput,
} from 'react-native';

import {getMoviesPopular} from '../model/MovieApi';
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';
import configApi from '../model/configApi/configApi';

const Home = props => {
  const {navigation} = props;
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [filter, setFilter] = useState('');

  const goToLongDescription = useCallback(
    item => {
      navigation.navigate('Movie', {
        item: item,
      });
    },
    [navigation],
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (!loading && !isListEnd) {
      setLoading(true);
      // Service to get the data from the server to render
      try {
        const response = await getMoviesPopular(offset);
        // Successful response from the API Call
        if (response.results.length > 0) {
          setOffset(offset + 1);
          // After the response increasing the offset
          setDataSource([...dataSource, ...response.results]);
          setLoading(false);
        } else {
          setIsListEnd(true);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const dataFiltered = useMemo(() => {
    if (dataSource !== []) {
      return dataSource.filter(o => o.original_title.includes(filter));
    }
  }, [dataSource, filter]);

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : null}
      </View>
    );
  };

  const ItemView = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={() => goToLongDescription(item)}>
        <View style={styles.mainCardView}>
          <View style={styles.subCardContainer}>
            <View style={[styles.subCardView, {flex: 1}]}>
              <Image
                style={styles.movieImg}
                source={{uri: configApi.LESS_IMAGE_ADDRESS + item.poster_path}}
                resizeMode="cover"
              />
              <Text style={styles.votecount}>{item.vote_count + ' votes'}</Text>
            </View>
            <View style={[styles.movieInfos, {flex: 3}]}>
              <View style={styles.movieTitleContainer}>
                <Text style={styles.movieTitle}>{item.title}</Text>
              </View>
              <View style={styles.resumeContainer}>
                <Text style={styles.resume} numberOfLines={5}>
                  {item.overview}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder={'Recherche...'}
        value={filter}
        onChangeText={setFilter}
      />

      <FlatList
        data={dataFiltered}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: '#FFF',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    fontSize: 18,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainCardView: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    margin: 6,
    height: 100,
  },
  movieInfos: {
    marginLeft: 20,
  },
  movieTitleContainer: {
    flexDirection: 'row',
  },
  movieTitle: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 14,
    color: Colors.black,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  movieImg: {
    borderColor: '#DDD',
    borderWidth: 2,
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  resumeContainer: {
    borderWidth: 0,
    width: '85%',
  },
  resume: {
    color: Colors.gray,
    fontSize: 12,
  },
  subCardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subCardView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  votecount: {
    color: '#1F6FEB',
  },
});

export default Home;
