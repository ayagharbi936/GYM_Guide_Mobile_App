/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '../Style/styles';
import Button from 'apsl-react-native-button';
import {Avatar, SocialIcon, Input} from 'react-native-elements';
//import Dots from 'react-native-dots-pagination';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

class Inscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //active: 0,
      login: '',
      mdp: '',
      name: '',
      cmdp: '',
      emailError: '',
      pswError: '',
      cpswError: '',
      nameError: '',
      existError: "cet email est déjà utilisé. merci d'en saisir un nouveau",
      filePath: 'null',
    };
  }
  _Register() {
    fetch('http://stage.t-cody.com/api/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.login,
        password: this.state.mdp,
        name: this.state.name,
        c_password: this.state.cmdp,
        imageSrc: this.state.filePath,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success != null) {
          AsyncStorage.setItem('user', JSON.stringify(responseJson.success));
          this.props.navigation.navigate('user');
        } else if (responseJson.message != null) {
          Alert.alert(this.state.existError);
        } else {
          this.setState({
            emailError: responseJson.error.email,
            pswError: responseJson.error.password,
            cpswError: responseJson.error.c_password,
            nameError: responseJson.error.name,
          });
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
  render() {
    return (
      <KeyboardAwareScrollView style={styles.mainContainer}>
        <Button
          style={styles.nextBTN}
          textStyle={{fontSize: 17, color: '#373737'}}
          onPress={() => this.props.navigation.navigate('visitor')}>
          Plus tard
        </Button>

        <View
          style={{
            alignItems: 'center',
            marginTop: 40,
          }}>
          <Text style={styles.title}>Créer Un Compte</Text>
          <Avatar
            size="large"
            rounded
            icon={{name: 'camera', type: 'font-awesome'}}
            onPress={this.handleChoosePhoto}
            activeOpacity={0.7}
            source={{uri: this.state.filePath}}
          />
          <View
            style={{
              alignItems: 'center',
            }}>
            <Input
              placeholder="Email"
              errorStyle={{color: 'red', fontSize: 17}}
              errorMessage={this.state.emailError}
              inputContainerStyle={{width: 290}}
              containerStyle={{
                marginBottom: 10,
              }}
              onChangeText={value => {
                return this.setState({login: value});
              }}
            />

            <Input
              placeholder="Nom & Prénom"
              errorStyle={{color: 'red', fontSize: 17}}
              errorMessage={this.state.nameError}
              inputContainerStyle={{width: 290}}
              containerStyle={{
                marginBottom: 10,
              }}
              onChangeText={value => {
                return this.setState({name: value});
              }}
            />
            <Input
              errorStyle={{color: 'red', fontSize: 17}}
              errorMessage={this.state.pswError}
              secureTextEntry={true}
              placeholder="Mot de passe"
              inputContainerStyle={{width: 290}}
              containerStyle={{
                marginBottom: 10,
              }}
              onChangeText={value => {
                return this.setState({mdp: value});
              }}
            />
            <Input
              secureTextEntry={true}
              errorStyle={{color: 'red', fontSize: 17}}
              errorMessage={this.state.cpswError}
              placeholder="Confirmer votre mot de passe"
              inputContainerStyle={{width: 290}}
              containerStyle={{
                marginBottom: 30,
              }}
              onChangeText={value => {
                return this.setState({cmdp: value});
              }}
            />
          </View>
          <Button
            style={styles.orangeBtn}
            textStyle={styles.orangeTxtBtn}
            onPress={() => this._Register()}>
            S'inscrire
          </Button>
        </View>

        <TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: '#373737',
              marginTop: 20,
            }}
            onPress={() => this.props.navigation.navigate('connexion')}>
            {' '}
            Vous avez un compte ?
            <Text style={styles.highlight}> Se connecter</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

export default Inscription;
