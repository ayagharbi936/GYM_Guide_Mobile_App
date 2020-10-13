/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, ScrollView, RefreshControl} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      isLoading: true,
    };
  }
  deleteFavorite(idfavorite) {
    fetch('http://stage.t-cody.com/api/deleteFavorite/' + idfavorite, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount = async () => {
    this.setState({isLoading: true});
    let user = JSON.parse(await AsyncStorage.getItem('user'));
    fetch(
      'http://stage.t-cody.com/api/favorites/' + user.id,

      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())

      .then(responseJson => {
        this.setState({
          favorites: responseJson.message,
        });
      })
      .finally(() => {
        this.setState({isLoading: false});
      })

      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={this.componentDidMount}
          />
        }>
        {this.state.favorites.map((item, i) => {
          return (
            <View key={item.id_favorite} style={{flexDirection: 'row'}}>
              <ListItem
                containerStyle={{
                  margin: 10,
                  borderRadius: 20,
                  width: 340,
                }}
                title={item.gym.name}
                leftElement={
                  <Image
                    source={{
                      uri: item.gym.image_src,
                    }}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 15,
                    }}
                  />
                }
                rightIcon={{
                  name: 'heart',
                  type: 'font-awesome',
                  color: '#f50',
                }}
                bottomDivider
              />
              <TouchableOpacity
                onPress={() => {
                  this.deleteFavorite(item.favorite.id_favorite);
                }}>
                <Icon
                  key={i}
                  name="trash-o"
                  type="font-awesome"
                  color="#212121"
                  containerStyle={{marginTop: 50}}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}
