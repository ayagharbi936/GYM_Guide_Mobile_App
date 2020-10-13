/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {ScrollView} from 'react-native-gesture-handler';
import {View, Text, ImageBackground, RefreshControl} from 'react-native';
import Button from 'apsl-react-native-button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from '../Style/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'react-native-elements';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      user: null,
      isLoading: true,
    };
  }
  componentDidMount = async () => {
    this.setState({isLoading: true});
    let user = JSON.parse(await AsyncStorage.getItem('user'));
    fetch('http://stage.t-cody.com/api/events', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          events: responseJson.data,
          user: user,
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
        <View style={styles.mainContainer}>
          <TouchableOpacity>
            <Ionicons
              style={{
                marginRight: 20,
                marginTop: 20,
                marginBottom: 20,
                alignSelf: 'flex-end',
              }}
              name="md-add"
              size={35}
              color="#212121"
              onPress={() => {
                if (this.state.user === null) {
                  this.props.navigation.navigate('connexion');
                } else {
                  this.props.navigation.navigate('addevent');
                }
              }}
            />
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={{alignItems: 'center', marginTop: 20}}
            scrollEventThrottle={16}>
            {this.state.events.map((item, key) => (
              <TouchableOpacity
                key={item.event.id_event}
                onPress={() => {
                  this.props.navigation.navigate('eventdetail', {
                    event: item.event,
                    postedBy: item.user,
                  });
                }}>
                <View
                  style={{
                    width: 370,
                    height: 170,
                    borderWidth: 1,
                    borderColor: '#dddddd',
                    borderRadius: 20,
                    marginTop: 20,
                  }}>
                  <ImageBackground
                    style={{flex: 1, width: '100%', height: '100%'}}
                    source={{uri: item.event.image_src}}
                    imageStyle={{borderRadius: 15}}>
                    <View
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        flex: 1,
                        borderRadius: 20,
                      }}>
                      <View style={{margin: 30}}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 25,
                            color: '#fff',
                          }}>
                          {item.event.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}>
                          <View>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 17,
                                color: '#fff',
                              }}>
                              {item.event.startDate}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 17,
                                color: '#fff',
                              }}>
                              {item.event.startTime}
                            </Text>
                          </View>

                          <View style={{alignSelf: 'flex-end'}}>
                            <FontAwesome
                              style={{marginBottom: 10}}
                              name="arrow-circle-right"
                              size={25}
                              color="white"
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 10,
                          }}>
                          <Icon
                            name="location"
                            type="evilicon"
                            color="#fff"
                            size={25}
                          />
                          <Text
                            style={{
                              fontSize: 17,
                              color: '#fff',
                              fontWeight: 'bold',
                            }}>
                            {item.event.location}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

export default Event;
