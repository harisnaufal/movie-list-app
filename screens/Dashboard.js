import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Overlay } from 'react-native-magnus';
// Actions
import { getMovieList, resetList } from '../store/actions/dashboard';
// Constants
import { Colors, Sizing } from '../constants';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.WHITE },
  content: {
    padding: 20,
  },
  bold: {
    fontSize: 16,
    fontWeight: '700',
  },
  medium: {
    fontSize: 15,
    fontWeight: '600',
  },
  regular: {
    fontSize: 14,
    fontWeight: '500',
  },
  light: {
    fontSize: 13,
    fontWeight: '400',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  imgContainer: {
    height: 140,
    width: 100,
  },
  img: {
    height: null,
    width: null,
    flex: 1,
    resizeMode: 'cover',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  imgPoster: {
    height: Sizing.SCREENHEIGHT - 500,
    width: Sizing.SCREENWIDTH - 125,
  },
});

const initialParams = {
  apikey: 'cfa9acb9',
  s: 'batman',
  page: 1,
};

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const { lists, loading } = useSelector((state) => state.dashboard);
  const [params, setParams] = useState(initialParams);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    resetList(dispatch);
  }, []);

  useEffect(() => {
    getMovieListApi();
  }, [params]);

  const getMovieListApi = async () => {
    try {
      await getMovieList(dispatch, params);
    } catch (error) {}
  };

  const onEndReachedHandler = (info) => {
    if (info.distanceFromEnd >= 0) {
      setParams((oldParams) => ({
        ...oldParams,
        page: oldParams.page + 1,
      }));
    }
  };

  const onChangeText = async (value) => {
    setParams((oldParams) => ({
      ...oldParams,
      page: 1,
      s: value,
    }));
    await resetList(dispatch);
  };

  const onPressDetail = (imdbID) => {
    navigation.navigate('Details', { imdbID });
  };

  const onPressPoster = (img) => {
    setPoster(img);
    setOverlayVisible(true);
  };

  const renderSearchBar = () => {
    return (
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          onChangeText={(val) => onChangeText(val)}
          value={params.s || ''}
          placeholder='Search Movie by Title'
        />
      </View>
    );
  };

  const renderContent = () => {
    if (lists.Response === 'False') {
      return (
        <View>
          <Text style={[styles.medium, { color: Colors.BLUE }]}>
            {lists.Error}
          </Text>
        </View>
      );
    }

    return (
      <>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.imdbID.toString()}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          onEndReached={onEndReachedHandler}
          renderItem={({ item, index }) => {
            return (
              <MovieCard
                item={item}
                onPressDetail={onPressDetail}
                onPressPoster={onPressPoster}
              />
            );
          }}
          ListFooterComponent={() => {
            if (loading) {
              return <ActivityIndicator size='large' />;
            }
            return <View />;
          }}
          ListEmptyComponent={() => {
            if (_.isEmpty(lists) && !loading) {
              return (
                <View>
                  <Text style={[styles.medium, { color: Colors.BLUE }]}>
                    Try to search a movie.
                  </Text>
                </View>
              );
            }
            return <View />;
          }}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={Colors.PRIMARYBLUE} />
      <View style={styles.content}>
        {renderSearchBar()}
        {renderContent()}
      </View>
      <Overlay
        visible={overlayVisible}
        w={Sizing.SCREENWIDTH - 100}
        overlayOpacity={0.85}
        onBackdropPress={() => {
          setOverlayVisible(false);
        }}
      >
        <View style={styles.imgPoster}>
          <Image style={styles.img} source={{ uri: poster }} />
        </View>
      </Overlay>
    </View>
  );
};

export default Dashboard;

const MovieCard = ({ item, onPressDetail, onPressPoster }) => {
  return (
    <View style={[styles.row, { marginBottom: 10 }]}>
      <Pressable
        style={[styles.imgContainer, { marginRight: 20 }]}
        onPress={() => {
          onPressPoster(item.Poster);
        }}
      >
        <Image style={styles.img} source={{ uri: item.Poster }} />
      </Pressable>
      <Pressable
        style={styles.column}
        onPress={() => {
          onPressDetail(item.imdbID);
        }}
      >
        <Text style={[styles.bold, { marginBottom: 5, color: Colors.BLUE }]}>
          {item.Title}
        </Text>
        <Text style={styles.medium}>{item.Year}</Text>
      </Pressable>
    </View>
  );
};
