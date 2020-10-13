/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import EventItem from './EventItem';
import AsyncStorage from '@react-native-community/async-storage';

class UserEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goingEvents: [],
      createdEvents: [],
    };
  }
  componentDidMount = async () => {
    this.setState({isLoading: true});
    let user = JSON.parse(await AsyncStorage.getItem('user'));

    fetch('http://stage.t-cody.com/api/eventparticipantuser/' + user.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          goingEvents: responseJson.message,
        });
      })
      .catch(error => {
        console.log(error);
      });
    fetch('http://stage.t-cody.com/api/eventuser/' + user.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          createdEvents: responseJson.data,
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
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          <View
            style={{
              marginTop: 50,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                paddingHorizontal: 20,
              }}>
              événements auxquels vous avez participé
            </Text>

            <View style={{height: 210, marginTop: 20, marginBottom: 30}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {this.state.goingEvents.map((item, key) => (
                  <View key={item.event.id_event}>
                    <EventItem event={item.event} />
                  </View>
                ))}
              </ScrollView>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                paddingHorizontal: 20,
              }}>
              événements que vous avez créés
            </Text>

            <View style={{height: 210, marginTop: 20}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {this.state.createdEvents.map((item, key) => (
                  <View key={item.event.id_event}>
                    <EventItem event={item.event} />
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default UserEvent;
