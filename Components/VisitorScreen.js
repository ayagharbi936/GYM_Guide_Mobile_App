/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
//import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '../Style/styles';
import GymItem from './GymItem';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import EventItem from './EventItem';
const {width} = Dimensions.get('window');

class VisitorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gyms: [],
      events: [],
    };
  }
  componentDidMount() {
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
  }
  _displayDetailForGym = gym => {
    this.props.navigation.navigate('gymdetail', {gym: gym});
  };
  _displayDetailForEvent = (event, postedBy) => {
    this.props.navigation.navigate('eventdetail', {
      event: event,
      postedBy: postedBy,
    });
  };
  render() {
    return (
      <View style={styles.mainContainer}>
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
              size={27}
              color="#212121"
              onPress={() => this.props.navigation.navigate('search')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                marginRight: 10,
                fontSize: 18,
              }}
              onPress={() => this.props.navigation.navigate('connexion')}>
              Se connecter {'  '}
              <SimpleLineIcons name="login" size={25} color="#F4511E" />
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{marginTop: 10}} scrollEventThrottle={16}>
          <View style={{flex: 1, backgroundColor: 'white', paddingTop: 20}}>
            <Text
              style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}>
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
              style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}>
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
      </View>
    );
  }
}

export default VisitorScreen;
