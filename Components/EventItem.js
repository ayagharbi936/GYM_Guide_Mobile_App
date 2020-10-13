/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import Button from 'apsl-react-native-button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';

class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {event, displayDetailForEvent, postedBy} = this.props;
    return (
      <TouchableOpacity onPress={() => displayDetailForEvent(event, postedBy)}>
        <View
          style={{
            height: 200,
            width: 200,
            marginLeft: 20,
            borderWidth: 2,
            borderColor: '#dddddd',

            borderRadius: 20,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <Image
              source={{
                uri: event.image_src,
              }}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'cover',
                borderRadius: 15,
              }}
            />
          </View>

          <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
            <Text style={{color: 'red'}}>
              {event.startDate} à {event.startTime}{' '}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{event.name}</Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <Icon name="location" type="evilicon" color="#212121" size={25} />
              <Text style={{fontSize: 18, color: '#666'}}>
                {event.location}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default EventItem;
