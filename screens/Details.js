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
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
// Actions
import { getMovieDetails } from '../store/actions/dashboard';
// Constants
import { Colors } from '../constants';

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
    height: 200,
    width: 150,
  },
  img: {
    height: null,
    width: null,
    flex: 1,
    resizeMode: 'cover',
  },
  box: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.DARKGREY,
    padding: 12,
  },
});

const Details = ({ route }) => {
  const dispatch = useDispatch();
  const { details, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    getMovieListDetails();
  }, []);

  const getMovieListDetails = async () => {
    try {
      const params = {
        apikey: 'cfa9acb9',
        i: route.params.imdbID,
      };
      await getMovieDetails(dispatch, params);
    } catch (error) {}
  };

  if (loading) {
    return (
      <View style={{ marginTop: 20 }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={Colors.PRIMARYBLUE} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          <View style={[styles.row, { marginBottom: 15 }]}>
            <View style={[styles.imgContainer, { marginRight: 20 }]}>
              <Image style={styles.img} source={{ uri: details.Poster }} />
            </View>
            <View style={styles.column}>
              <Text
                style={[
                  styles.bold,
                  { marginBottom: 5, color: Colors.BLUE, fontSize: 20 },
                ]}
              >
                {details.Title}
              </Text>
              <Text
                style={[
                  styles.regular,
                  { marginBottom: 5, color: Colors.NORMALGREY },
                ]}
              >
                {details.Released}
              </Text>
              <Text
                style={[
                  styles.regular,
                  { marginBottom: 5, color: Colors.NORMALGREY },
                ]}
              >
                {details.Runtime}
              </Text>
              <Text
                style={[
                  styles.regular,
                  { marginBottom: 5, color: Colors.NORMALGREY },
                ]}
              >
                {details.Rated}
              </Text>
              <Text
                style={[
                  styles.regular,
                  { marginBottom: 5, color: Colors.NORMALGREY },
                ]}
              >
                {details.Genre}
              </Text>
              <Text
                style={[
                  styles.regular,
                  { marginBottom: 5, color: Colors.NORMALGREY },
                ]}
              >
                {details.Country}
              </Text>
              <Text
                style={[
                  styles.regular,
                  { marginBottom: 5, color: Colors.NORMALGREY },
                ]}
              >
                Votes: {details.imdbVotes}
              </Text>
              <Text
                style={[
                  styles.bold,
                  {
                    marginBottom: 5,
                    color: details.imdbRating > '5' ? Colors.GREEN : Colors.RED,
                    fontSize: 18,
                  },
                ]}
              >
                {details.imdbRating}
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <FlatList
              data={details.Ratings}
              keyExtractor={(item) => item.Source}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                const isLastIndex = details.Ratings.length - 1 === index;
                const isHigh =
                  item.Value > '5.0/10' ||
                  item.Value > '50%' ||
                  item.Value > '50/100';
                return (
                  <View
                    style={[styles.box, { marginEnd: isLastIndex ? 0 : 8 }]}
                  >
                    <Text
                      style={[
                        styles.regular,
                        { marginBottom: 5, color: Colors.PRIMARYBLACK },
                      ]}
                    >
                      {item.Source}
                    </Text>
                    <Text
                      style={[
                        styles.regular,
                        { color: isHigh ? Colors.GREEN : Colors.RED },
                      ]}
                    >
                      {item.Value}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={[
                styles.regular,
                { marginBottom: 5, color: Colors.NORMALGREY },
              ]}
            >
              Producer: {details.Production}
            </Text>
            <Text
              style={[
                styles.regular,
                { marginBottom: 5, color: Colors.NORMALGREY },
              ]}
            >
              Director: {details.Director}
            </Text>
            <Text
              style={[
                styles.regular,
                { marginBottom: 5, color: Colors.NORMALGREY },
              ]}
            >
              Writer: {details.Writer}
            </Text>
            <Text
              style={[
                styles.regular,
                { marginBottom: 5, color: Colors.NORMALGREY },
              ]}
            >
              Actor: {details.Actors}
            </Text>
            <Text
              style={[
                styles.regular,
                { marginBottom: 5, color: Colors.NORMALGREY },
              ]}
            >
              Language: {details.Language}
            </Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={[styles.medium, { marginBottom: 2 }]}>Box Office</Text>
            <Text
              style={[
                styles.regular,
                { marginBottom: 5, color: Colors.NORMALGREY, lineHeight: 22 },
              ]}
            >
              {details.BoxOffice}
            </Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={[styles.medium, { marginBottom: 2 }]}>Plot</Text>
            <Text
              style={[
                styles.regular,
                { marginBottom: 5, color: Colors.NORMALGREY, lineHeight: 22 },
              ]}
            >
              {details.Plot}
            </Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={[styles.medium, { marginBottom: 2 }]}>Awards</Text>
            <Text
              style={[
                styles.regular,
                { marginBottom: 5, color: Colors.NORMALGREY, lineHeight: 22 },
              ]}
            >
              {details.Awards}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Details;
