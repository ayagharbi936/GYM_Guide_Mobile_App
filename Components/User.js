/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, RefreshControl} from 'react-native';
//import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '../Style/styles';
import GymItem from './GymItem';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import EventItem from './EventItem';
const {width} = Dimensions.get('window');
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      events: [],
      gyms: [],
      isLoading: true,
    };
  }
  _displayDetailForGym = gym => {
    this.props.navigation.navigate('gymdetail', {
      gym: gym,
      user: this.state.user,
    });
  };
  _displayDetailForEvent = (event, postedBy) => {
    this.props.navigation.navigate('eventdetail', {
      event: event,
      postedBy: postedBy,
    });
  };
  componentDidMount = async () => {
    this.setState({isLoading: true});
    let user = JSON.parse(await AsyncStorage.getItem('user'));
    fetch('http://stage.t-cody.com/api/comingevents', {
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
      .catch(error => {
        console.log(error);
      });
    fetch('http://stage.t-cody.com/api/gyms', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          gyms: responseJson,
        });
      })

      .catch(error => {
        console.log(error);
      });
    this.setState({isLoading: false, user: user});
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={this.componentDidMount}
            />
          }>
          <View
            style={{
              marginTop: 30,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity>
              <Ionicons
                style={{marginLeft: 20}}
                name="md-search"
                size={30}
                color="#212121"
                onPress={() => this.props.navigation.navigate('search')}
              />
            </TouchableOpacity>
            <Avatar
              containerStyle={{marginRight: 20}}
              size="medium"
              rounded
              icon={{name: 'user', type: 'font-awesome'}}
              activeOpacity={0.7}
              source={{
                uri:
                  this.state.user.imageSrc === null
                    ? 'null'
                    : this.state.user.imageSrc,
              }}
              onPress={() => this.props.navigation.navigate('profile1')}
            />
          </View>
          <ScrollView style={{marginTop: 10}} scrollEventThrottle={16}>
            <View style={{flex: 1, backgroundColor: 'white', paddingTop: 20}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  paddingHorizontal: 20,
                }}>
                Evénements à venir
              </Text>

              <View style={{height: 210, marginTop: 20}}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {this.state.events.map((item, key) => (
                    <View key={item.event.id_event}>
                      <EventItem
                        postedBy={item.user}
                        event={item.event}
                        displayDetailForEvent={this._displayDetailForEvent}
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={{marginTop: 40}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  paddingHorizontal: 20,
                }}>
                Salles de sport diponibles
              </Text>
              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: 20,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {this.state.gyms.map((item, key) => (
                  <View key={key}>
                    <GymItem
                      width={width}
                      price={82}
                      rating={4}
                      gym={item}
                      displayDetailForGym={this._displayDetailForGym}
                    />
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

export default User;
