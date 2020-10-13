/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, TouchableOpacity, FlatList, Text, TextInput} from 'react-native';
import {Card, Overlay, AirbnbRating} from 'react-native-elements';
import FeedbackItem from './FeedbackItem.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from 'apsl-react-native-button';
import AsyncStorage from '@react-native-community/async-storage';

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      feedbacks: [],
      msgNotFound: '',
      user: '',
      content: '',
      rate: '',
      disabled: true,
      isLoading: true,
    };
  }
  toggleOverlay = () => {
    if (this.state.visible) {
      this.setState({visible: false});
    } else {
      this.setState({visible: true});
    }
  };
  componentDidMount = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('user'));
    this.setState({isLoading: true});
    fetch('http://stage.t-cody.com/api/feedbacks', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip;q=1.0, compress;q=0.5',
      },
    })
      .then(response => response.json())

      .then(responseJson => {
        //console.log(responseJson);
        if (responseJson.message.length === 0) {
          this.setState({
            msgNotFound: 'aucun Feedback trouvé',
          });
        } else {
          this.setState({
            feedbacks: responseJson.message,
          });
        }
      })
      .finally(() => {
        this.setState({isLoading: false, user: user});
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}} />
        <Card containerStyle={{padding: 0, height: 650}}>
          <FlatList
            data={this.state.feedbacks}
            keyExtractor={item => item.feed.id_feedback.toString()}
            renderItem={({item}) => (
              <FeedbackItem feedback={item} user={this.state.user} />
            )}
            style={{flex: 0}}
            refreshing={this.state.isLoading}
            onRefresh={this.componentDidMount}
            initialNumToRender={this.state.feedbacks.length}
          />
          <Text style={{textAlign: 'center', fontWeight: '600', fontSize: 20}}>
            {this.state.msgNotFound}
          </Text>
        </Card>
      </View>
    );
  }
}

export default Community;
