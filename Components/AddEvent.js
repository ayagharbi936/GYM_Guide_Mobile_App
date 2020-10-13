/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Picker,
  ImageBackground,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '../Style/styles';
import {Avatar, Input, Image} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import Button from 'apsl-react-native-button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      eventName: '',
      eventStartDate: '',
      eventStartTime: '',
      eventEndDate: '',
      eventEndTime: '',
      eventLocation: '',
      eventDetail: '',
      filePath: 'null',
      nameError: '',
      locationError: '',
      detailError: '',
    };
  }
  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem('user');

      if (value !== null) {
        // We have data!!
        this.setState({
          user: JSON.parse(value),
        });
      }
    } catch (error) {
      console.log('Error retrieving data');
    }
  };
  handleChoosePhoto = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        //let source = response;
        // You can also display the image using data:
        this.setState({
          filePath: 'data:image/jpeg;base64,' + response.data,
        });
      }
    });
  };
  addEvent() {
    if (this.state.eventName.length === 0) {
      this.setState({nameError: "Le nom de l'évènement est requis"});
    } else {
      fetch('http://stage.t-cody.com/api/addevent', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.eventName,
          id: this.state.user.id,
          startDate: this.state.eventStartDate,
          startTime: this.state.eventStartTime,
          endDate: this.state.eventEndDate,
          endTime: this.state.eventEndTime,
          location: this.state.eventLocation,
          detail: this.state.eventDetail,
          image_src: this.state.filePath,
        }),
      })
        .then(response => response.json())

        .then(responseJson => {
          this.props.navigation.navigate('event');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.mainContainer}>
        <View
          style={{
            margin: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity>
            <Ionicons
              name="md-close"
              size={35}
              color="#aaa69d"
              onPress={() => this.props.navigation.goBack()}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.addEvent()}>
            <Ionicons name="md-checkmark" size={35} color="#212121" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => this.handleChoosePhoto}>
          <View
            style={{
              height: 200,
              backgroundColor: '#BDBDBD',
            }}>
            <ImageBackground
              style={{
                height: '100%',
                width: '100%',
                flex: 1,
                justifyContent: 'center',
              }}
              source={{uri: this.state.filePath}}>
              <Button
                style={{
                  height: 30,
                  width: 170,
                  backgroundColor: '#9e9e9e',
                  borderColor: '#fff',
                  borderRadius: 5,
                  borderWidth: 2,

                  alignSelf: 'center',
                  padding: 5,
                }}
                onPress={() => this.handleChoosePhoto()}
                textStyle={{fontSize: 12, color: '#fff', fontWeight: 'bold'}}>
                <MaterialIcons name="add-a-photo" size={20} color="#fff" />
                AJOUTER UNE PHOTO
              </Button>
            </ImageBackground>
          </View>

          <View style={{margin: 20}}>
            <Input
              placeholder="Nom de l'évènement"
              inputContainerStyle={{width: 320}}
              errorMessage={this.state.nameError}
              onChangeText={value => {
                return this.setState({eventName: value});
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 30,
                justifyContent: 'space-around',
              }}>
              <Ionicons
                name="md-time"
                size={30}
                color="#9e9e9e"
                onPress={() => this.props.navigation.goBack()}
              />
              <DatePicker
                style={{width: 100}}
                date={this.state.eventStartDate}
                mode="date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirmer"
                cancelBtnText="Annuler"
                placeholder="date de debut"
                showIcon={false}
                customStyles={{
                  dateInput: {borderWidth: 0, borderBottomWidth: 1},
                }}
                onDateChange={value => {
                  return this.setState({eventStartDate: value});
                }}
              />
              <DatePicker
                style={{width: 100}}
                date={this.state.eventStartTime}
                mode="time"
                format="hh:mm a"
                placeholder="heure de debut"
                confirmBtnText="Confirmer"
                cancelBtnText="Annuler"
                showIcon={false}
                customStyles={{
                  dateInput: {borderWidth: 0, borderBottomWidth: 1},
                }}
                onDateChange={value => {
                  return this.setState({eventStartTime: value});
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 67,
                flexDirection: 'row',
                marginTop: 30,
                justifyContent: 'space-around',
              }}>
              <DatePicker
                style={{width: 100}}
                date={this.state.eventEndDate}
                mode="date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirmer"
                cancelBtnText="Annuler"
                placeholder="date de fin"
                showIcon={false}
                customStyles={{
                  dateInput: {borderWidth: 0, borderBottomWidth: 1},
                }}
                onDateChange={value => {
                  return this.setState({eventEndDate: value});
                }}
              />
              <DatePicker
                style={{width: 100}}
                date={this.state.eventEndTime}
                mode="time"
                format="hh:mm a"
                placeholder="heure de fin"
                confirmBtnText="Confirmer"
                cancelBtnText="Annuler"
                showIcon={false}
                customStyles={{
                  dateInput: {borderWidth: 0, borderBottomWidth: 1},
                }}
                onDateChange={value => {
                  return this.setState({eventEndTime: value});
                }}
              />
            </View>

            <Input
              errorMessage={this.state.error}
              placeholder="lieu"
              inputContainerStyle={{width: 320, marginTop: 20}}
              leftIconContainerStyle={{marginLeft: 0}}
              leftIcon={
                <Entypo
                  name="location-pin"
                  size={28}
                  color="#9e9e9e"
                  onPress={() => this.props.navigation.goBack()}
                />
              }
              onChangeText={value => {
                return this.setState({eventLocation: value});
              }}
            />
            <Input
              errorMessage={this.state.error}
              placeholder="détails"
              inputContainerStyle={{width: 320, marginTop: 20}}
              leftIconContainerStyle={{marginLeft: 0}}
              leftIcon={
                <Entypo
                  name="pencil"
                  size={25}
                  color="#9e9e9e"
                  onPress={() => this.props.navigation.goBack()}
                />
              }
              onChangeText={value => {
                return this.setState({eventDetail: value});
              }}
            />
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

export default AddEvent;
