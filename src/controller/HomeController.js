// Example of Infinite Loading Listview in React Native using FlatList
// https://aboutreact.com/infinite-list-view/

// import React in our code
import React, {useState, useEffect, useCallback} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
  Modal,
  Pressable,
} from 'react-native';

import {getMoviesPopular} from '../model/MovieApi';
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';
import configApi from '../model/configApi/configApi';
import DescriptionMovieModal from '../customJSX/DescriptionMovieModal';

const movieVue = props => {
  const {navigation} = props;
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const goToLongDescription = useCallback(() => {
    navigation.navigate('longDescription', {
      title: 'Description',
      quantity: 10,
    });
  }, [navigation]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
        //... gérer l'erreur
      }
    }
  };

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : null}
      </View>
    );
  };

  const ItemView = ({item}) => {
    return (
      /* Flat List Item
      <Text style={styles.itemStyle} >
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>*/

      <TouchableWithoutFeedback onLongPress={() => setIsModalVisible(true)}>
        <View style={styles.mainCardView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.subCardView}>
              <Image
                source={{
                  uri: configApi.LESS_IMAGE_ADDRESS + item.poster_path,
                }}
                resizeMode="cover"
                style={{
                  borderRadius: 25,
                  height: 50,
                  width: 50,
                }}
              />
            </View>
            <View style={{marginLeft: 12}}>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.black,
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}>
                {item.title}
              </Text>
              <View
                style={{
                  marginTop: 4,
                  borderWidth: 0,
                  width: '85%',
                }}>
                <Text
                  style={{
                    color: Colors.gray,
                    fontSize: 12,
                  }}>
                  {item.overview}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 25,
              backgroundColor: Colors.pink,
              borderWidth: 0,
              width: 25,
              marginLeft: -26,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
      />
      <DescriptionMovieModal
        visible={isModalVisible}
        dismissModal={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    height: 90,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default movieVue;
