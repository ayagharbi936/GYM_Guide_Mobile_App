/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating';
class Gymo extends Component {
  render() {
    const {gym, displayDetailForGym} = this.props;
    return (
      <TouchableOpacity onPress={() => displayDetailForGym(gym)}>
        <View
          style={{
            width: this.props.width - 40,
            height: this.props.width / 2,
            borderWidth: 0.1,
            borderColor: '#eee',
            marginBottom: 30,
            marginRight: 10,
            paddingBottom: 10,
            elevation: 2,
          }}>
          <View style={{flex: 2}}>
            <Image
              style={{flex: 1, width: null, height: null, resizeMode: 'cover'}}
              source={{
                uri: gym.image_src,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'space-around',
              paddingLeft: 10,
            }}>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>{gym.name}</Text>
            <StarRating
              disable={true}
              maxStars={5}
              rating={this.props.rating}
              starSize={17}
              fullStarColor={'orange'}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
export default Gymo;
