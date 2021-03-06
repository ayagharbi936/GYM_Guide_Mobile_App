import React, {Component} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import styles from '../Style/styles';
import Button from 'apsl-react-native-button';
import Dots from 'react-native-dots-pagination';

class Screen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
    //this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <ImageBackground
        source={require('../Images/Sc1.jpg')}
        style={(styles.backgroundIMG, styles.mainContainer)}>
        <View style={styles.overlayContainer}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 8,
              marginTop: 10,
            }}>
            <Button
              style={styles.nextBTN}
              textStyle={styles.textBTN}
              onPress={() => this.props.navigation.navigate('screen2')}>
              Sauter
            </Button>
          </View>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 3,
              alignSelf: 'center',
            }}>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: '#eeeeee',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 25,
              }}>
              lorem ipsum dolor{' '}
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: '#cccccc',
                textAlign: 'center',
                fontWeight: '700',
              }}>
              Lorem ipsum dolor sit {'\n'} sit consectetur adipiscing elit.
              {'\n'}Lorem ipsum dolor sit{' '}
            </Text>
          </View>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 2,
              alignSelf: 'center',
            }}>
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

          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 1,
              marginBottom: 10,
            }}>
            <Button
              style={styles.nextBTN}
              textStyle={styles.textBTN}
              onPress={() => this.props.navigation.navigate('screen2')}>
              Suivant
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Screen1;
