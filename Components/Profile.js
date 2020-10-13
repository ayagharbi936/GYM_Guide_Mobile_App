/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Picker} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '../Style/styles';
import {Avatar, Input} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //active: 0,
      login: '',
      name: '',
      adress: '',
      phone: '',
      birthday: '',
      sexe: '',
      choosenIndex: 0,

      emailError: '',
      phoneError: '',

      nameError: '',
      existError: "cet email est déjà utilisé. merci d'en saisir un nouveau",
      filePath: 'null',
      user: '',
    };
  }
  _Update() {
    fetch('http://stage.t-cody.com/api/update/' + this.state.user.id, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        adress: this.state.adress,
        phone: this.state.phone,
        birthday: this.state.birthday,
        sexe: this.state.sexe,
        imageSrc: this.state.filePath,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success != null) {
          AsyncStorage.setItem('user', JSON.stringify(responseJson.success));
          this.props.navigation.navigate('profile1');
        } else {
          console.log('error');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
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
  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem('user');

      if (value !== null) {
        // We have data!!
        this.setState({
          user: JSON.parse(value),
        });
      }
      if (this.state.user.filePath !== null) {
        this.setState({
          filePath: this.state.user.imageSrc,
        });
      }
      this.setState({
        name: this.state.user.name,
        phone: this.state.user.phone,
        birthday: this.state.user.birthday,
        adress: this.state.user.adress,
        sexe: this.state.user.sexe,
      });
    } catch (error) {
      console.log('Error retrieving data');
    }
  };
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
          <TouchableOpacity>
            <Ionicons
              name="md-checkmark"
              size={35}
              color="#212121"
              onPress={() => this._Update()}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={styles.title}>modifier votre Compte</Text>
          <Avatar
            size="xlarge"
            rounded
            icon={{name: 'user', type: 'font-awesome'}}
            onPress={this.handleChoosePhoto}
            activeOpacity={0.7}
            source={{
              uri: this.state.filePath === null ? 'null' : this.state.filePath,
            }}
            showEditButton
          />
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
            }}>
            <Input
              disabled
              label="Email"
              //labelStyle={{marginLeft:50}}
              placeholder="Email"
              errorStyle={{color: 'red'}}
              inputContainerStyle={{width: 290}}
              defaultValue={this.state.user.email}
              onChangeText={value => {
                return this.setState({login: value});
              }}
            />
            <Text style={{fontSize: 15, color: 'red'}}>
              {this.state.emailError}
            </Text>

            <Input
              label="Nom & Prénom"
              defaultValue={this.state.user.name}
              placeholder="Nom & Prénom"
              inputContainerStyle={{width: 290}}
              onChangeText={value => {
                return this.setState({name: value});
              }}
            />
            <Text>{this.state.nameError}</Text>
            <Input
              label="Adresse"
              defaultValue={
                this.state.user.adress === null ? '' : this.state.user.adress
              }
              placeholder="Entrer votre adresse"
              inputContainerStyle={{width: 290}}
              onChangeText={value => {
                return this.setState({adress: value});
              }}
            />
            <Input
              label="Téléphone"
              defaultValue={
                this.state.user.phone === null ? '' : this.state.user.phone
              }
              placeholder="Entrer votre Téléphone"
              inputContainerStyle={{width: 290}}
              onChangeText={value => {
                return this.setState({phone: value});
              }}
              containerStyle={{marginTop: 15}}
            />

            <Text
              style={{
                alignSelf: 'flex-start',
                marginLeft: 10,
                fontSize: 17,
                color: '#929DA6',
                fontWeight: 'bold',
                marginTop: 15,
                marginBottom: 15,
              }}>
              Date de naissance
            </Text>
            <DatePicker
              label="date de naissance"
              style={{marginBottom: 15, width: 290}}
              date={
                this.state.user.birthday === null
                  ? ''
                  : this.state.user.birthday
              }
              mode="date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirmer"
              cancelBtnText="Annuler"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 10,
                  top: 4,
                  marginLeft: 0,
                },
              }}
              onDateChange={date => {
                this.setState({birthday: date});
              }}
            />

            <Text
              style={{
                alignSelf: 'flex-start',
                marginLeft: 10,
                fontSize: 17,
                color: '#929DA6',
                fontWeight: 'bold',
              }}>
              Sexe
            </Text>
            <Picker
              selectedValue={this.state.sexe}
              style={{
                marginBottom: 10,
                height: 50,
                width: 150,
                alignSelf: 'flex-start',
              }}
              onValueChange={(itemValue, itemPosition) =>
                this.setState({sexe: itemValue, choosenIndex: itemPosition})
              }>
              <Picker.Item label="" value="null" />
              <Picker.Item label="Homme" value="Homme" />
              <Picker.Item label="Femme" value="Femme" />
            </Picker>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Profile;
