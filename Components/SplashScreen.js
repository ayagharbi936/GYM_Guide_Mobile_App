/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from '../Style/styles';
import AsyncStorage from '@react-native-community/async-storage';
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }
  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem('user');

      if (value !== null) {
        // We have data!!
        this.setState({user: JSON.parse(value)});
      }
    } catch (error) {
      console.log('Error retrieving data');
    }
    this.timeoutHandle = setTimeout(() => {
      if (this.state.user === '') {
        this.props.navigation.navigate('screen1');
      } else {
        this.props.navigation.navigate('user');
      }
    }, 2000);
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.mainImage}>
          <Text
            style={{
              color: '#000',
              fontSize: 40,
              fontWeight: '700',
            }}>
            LOGO
          </Text>
        </View>
        <View style={styles.mainTxt}>
          <Text style={styles.txtSplashScreen}>copyrights 2020</Text>
        </View>
      </View>
    );
  }
}

export default SplashScreen;
