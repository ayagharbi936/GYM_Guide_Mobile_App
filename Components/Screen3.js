/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import styles from '../Style/styles';
import Button from 'apsl-react-native-button';
import Dots from 'react-native-dots-pagination';

class Screen3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 2,
    };
    //this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <ImageBackground
        source={require('../Images/Sc1.jpg')}
        style={(styles.backgroundIMG, styles.mainContainer)}>
        <View style={styles.overlayContainer}>
          <View style={{flex: 2, marginTop: 10}}>
            <Button
              style={styles.nextBTN}
              textStyle={styles.textBTN}
              onPress={() => this.props.navigation.navigate('visitor')}>
              Sauter
            </Button>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={{
                color: '#000',
                fontSize: 40,
                fontWeight: '700',
              }}>
              LOGO
            </Text>
          </View>
          <View style={{flex: 4, alignItems: 'center', marginTop: 40}}>
            <Text
              style={{
                color: '#dddddd',
                textAlign: 'center',
                marginTop: 10,
                fontSize: 18,
              }}>
              Lorem ipsum dolor sit {'\n'} sit consectetur adipiscing elit.{' '}
            </Text>
          </View>
          <View style={{flex: 3, alignItems: 'center'}}>
            <Button
              style={styles.loginBtn}
              textStyle={styles.loginTxtBtn}
              onPress={() => this.props.navigation.navigate('connexion')}>
              Se connecter
            </Button>
            <Button
              style={styles.signBtn}
              textStyle={styles.signTxtBtn}
              onPress={() => this.props.navigation.navigate('inscription')}>
              S'inscrire
            </Button>
          </View>
          <View style={{flex: 3, alignSelf: 'center'}}>
            <Dots
              length={3}
              activeColor={'#F4511E'}
              activeDotWidth={10}
              activeDotHeight={10}
              passiveDotWidth={8}
              passiveDotHeight={8}
              active={this.state.active}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Screen3;
