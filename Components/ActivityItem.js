/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, ImageBackground} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class ActivityItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {course, displayDetailForCourse} = this.props;
    return (
      <TouchableOpacity onPress={() => displayDetailForCourse(course)}>
        <View
          style={{
            width: this.props.width / 2 - 30,
            height: this.props.width / 2,
            borderWidth: 1,
            borderColor: '#dddddd',
            borderRadius: 20,
          }}>
          <ImageBackground
            style={{flex: 1, width: '100%', height: '100%'}}
            source={{uri: course.image_src}}
            imageStyle={{borderRadius: 15}}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                flex: 1,
                borderRadius: 20,
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: 20,
                  }}>
                  {course.name}
                </Text>
                <View style={{alignSelf: 'flex-end'}}>
                  <FontAwesome
                    style={{marginRight: 10, marginBottom: 10}}
                    name="arrow-circle-right"
                    size={20}
                    color="white"
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ActivityItem;
