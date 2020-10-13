/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ImageBackground} from 'react-native';
import Button from 'apsl-react-native-button';
import {Icon, Avatar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      goingEvents: '',
      goingEvent: '',
      going: false,
      btnTitle: 'participer',
      btnColor: '#ff451f',
    };
  }
  componentDidMount = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('user'));
    if (user !== null) {
      fetch('http://stage.t-cody.com/api/eventparticipant/' + user.id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())

        .then(responseJson => {
          this.setState({
            user: user,
            goingEvents: responseJson.message,
          });
        })
        .finally(() => {
          this.setState({
            goingEvent: this.state.goingEvents.find(
              event =>
                event.id_event === this.props.route.params.event.id_event,
            ),
          });

          if (this.state.goingEvent !== undefined) {
            this.setState({
              going: true,
              btnTitle: 'participé',
            });
          }
        })

        .catch(error => {
          console.log(error);
        });
      this.setState({
        user: user,
      });
    }
  };
  going(event) {
    fetch('http://stage.t-cody.com/api/addeventparticipant', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_event: event.id_event,
        id: this.state.user.id,
      }),
    })
      .then(response => response.json())

      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {event, postedBy} = this.props.route.params;

    return (
      <View style={styles.main_container}>
        <ImageBackground
          source={{uri: event.image_src}}
          style={(styles.backgroundIMG, {flex: 1})}>
          <TouchableOpacity>
            <Ionicons
              style={{marginLeft: 10, marginTop: 20, marginBottom: 20}}
              name="md-arrow-back"
              size={35}
              color="#212121"
              onPress={() => this.props.navigation.goBack()}
            />
          </TouchableOpacity>
          <Button
            onPress={() => {
              if (this.state.user === null) {
                this.props.navigation.navigate('connexion');
              } else {
                this.going(event);
                this.setState({
                  going: true,
                  btnTitle: 'participé',
                  btnColor: 'green',
                });
              }
            }}
            style={{
              height: 40,
              width: 70,
              backgroundColor: '#fff',
              borderRadius: 10,
              borderColor: '#fff',
              alignSelf: 'flex-end',
              marginTop: 50,
              marginRight: 30,
            }}
            textStyle={{
              fontSize: 12,
              fontWeight: 'bold',
              color: this.state.going === true ? 'green' : '#ff451f',
            }}>
            {this.state.btnTitle}
          </Button>
        </ImageBackground>
        <View
          style={{
            flex: 2,
            top: -40,
            backgroundColor: 'white',
            borderRadius: 25,
            padding: 30,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.name_text}>{event.name}</Text>
            <Text style={styles.time_text}>
              {event.startDate} à {event.startTime}
            </Text>

            <Text style={styles.title_text}>Détails</Text>
            <Text style={styles.description_text}>{event.detail}</Text>
            <Text style={styles.title_text}>Posté par</Text>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                marginTop: 10,
              }}>
              <Avatar
                size={40}
                rounded
                source={{
                  uri: postedBy.imageSrc === null ? 'null' : postedBy.imageSrc,
                }}
              />
              <View style={{marginLeft: 20}}>
                <Text
                  style={{fontSize: 18, color: '#212121', fontWeight: 'bold'}}>
                  {postedBy.name}
                </Text>
                <Text style={{fontSize: 14, color: '#666'}}>
                  {event.created_at}
                </Text>
              </View>
            </View>
            <Text style={styles.title_text}>Localisation</Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <Icon name="location" type="evilicon" color="#212121" size={30} />
              <Text style={{fontSize: 18, color: '#212121'}}>
                {event.location}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundIMG: {
    width: '100%',
    height: '100%',
  },
  main_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 400,
    margin: 5,
  },
  name_text: {
    fontWeight: 'bold',
    fontSize: 35,

    marginBottom: 10,
    color: '#000000',
  },
  time_text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    color: '#FF451E',
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 5,
    color: '#666',
    marginTop: 20,
  },
  description_text: {
    color: 'gray',
    margin: 5,
    marginBottom: 15,
    fontSize: 17,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  yellowBtn: {
    width: 250,
    backgroundColor: '#F4511E',
    borderColor: '#F4511E',
    height: 50,
  },

  yellowTxtBtn: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default EventDetail;
