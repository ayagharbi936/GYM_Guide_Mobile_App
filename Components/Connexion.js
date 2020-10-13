/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '../Style/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import {SocialIcon, Input} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      pressed: 0,
      email: '',
      psw: '',
      emailError: '',
      pswError: '',
    };
  }

  onFocus(v) {
    this.setState({
      pressed: v,
    });
  }
  onBlur(v) {
    this.setState({
      pressed: v,
    });
  }
  _login() {
    fetch('http://stage.t-cody.com/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.psw,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success != null) {
          AsyncStorage.setItem('user', JSON.stringify(responseJson.success));
          this.props.navigation.navigate('user');
        } else if (responseJson.error === 'Unauthorised') {
          Alert.alert('Adresse e-mail ou mot de passe invalide');
        } else {
          this.setState({
            emailError: responseJson.error.email,
            pswError: responseJson.error.password,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let {pressed} = this.state;
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
            marginTop: 100,
          }}>
          <Text style={styles.title}>Se connecter</Text>
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Input
              errorStyle={{color: 'red', fontSize: 17}}
              errorMessage={this.state.emailError}
              onChangeText={value => {
                return this.setState({email: value});
              }}
              onBlur={() => this.onBlur(0)}
              onFocus={() => this.onFocus(1)}
              placeholder="Email"
              inputContainerStyle={{
                width: 290,
                borderBottomColor: pressed === 1 ? '#F4511E' : '#a9a9a9',
              }}
              containerStyle={{
                marginBottom: 10,
              }}
              leftIcon={
                <FontAwesome
                  name="user"
                  style={{marginRight: 20}}
                  size={24}
                  color={pressed === 1 ? '#F4511E' : '#a9a9a9'}
                />
              }
            />

            <Input
              errorStyle={{color: 'red', fontSize: 17}}
              errorMessage={this.state.pswError}
              secureTextEntry={true}
              onChangeText={value => {
                return this.setState({psw: value});
              }}
              placeholder="Mot de passe"
              onBlur={() => this.onBlur(0)}
              onFocus={() => this.onFocus(2)}
              inputContainerStyle={{
                width: 290,
                borderBottomColor: pressed === 2 ? '#F4511E' : '#a9a9a9',
              }}
              containerStyle={{marginBottom: 30}}
              leftIcon={
                <FontAwesome
                  name="lock"
                  style={{marginRight: 20}}
                  size={24}
                  color={pressed === 2 ? '#F4511E' : '#a9a9a9'}
                />
              }
            />
          </View>
          <Button
            style={styles.orangeBtn}
            textStyle={styles.orangeTxtBtn}
            onPress={() => this._login()}>
            Se connecter
          </Button>
        </View>

        <TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: '#373737',
              marginTop: 30,
            }}
            onPress={() => this.props.navigation.navigate('inscription')}>
            Vous n'avez pas un compte ?
            <Text style={styles.highlight}> S'inscrire</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

export default Connexion;
