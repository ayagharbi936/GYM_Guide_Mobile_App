/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, TouchableOpacity, FlatList, Text, TextInput} from 'react-native';
import {Card, Overlay, Rating, AirbnbRating} from 'react-native-elements';
import FeedbackItem from './FeedbackItem.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from 'apsl-react-native-button';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      feedbacks: [],
      msgNotFound: '',
      user: null,
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
    fetch(
      'http://stage.t-cody.com/api/feedbackGym/' +
        this.props.route.params.gym.id_gym,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())

      .then(responseJson => {
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

  addFeedback() {
    fetch('http://stage.t-cody.com/api/addFeedback', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_gym: this.props.route.params.gym.id_gym,
        id: this.state.user.id,
        content: this.state.content,
        rate: this.state.rate,
      }),
    })
      .then(() => {
        this.setState({visible: false});
      })
      .finally(() => {
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity>
            <Ionicons
              style={{marginLeft: 10, marginTop: 20, marginBottom: 20}}
              name="md-arrow-back"
              size={35}
              color="#212121"
              onPress={() => this.props.navigation.goBack()}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign
              style={{
                marginRight: 10,
                marginTop: 20,
                marginBottom: 20,
              }}
              name="pluscircle"
              size={35}
              color="#b2bec3"
              onPress={() => {
                if (this.state.user === null) {
                  this.props.navigation.navigate('connexion');
                } else {
                  this.toggleOverlay();
                }
              }}
            />
          </TouchableOpacity>
        </View>
        <Card containerStyle={{padding: 0, height: 600}}>
          <FlatList
            data={this.state.feedbacks}
            keyExtractor={item => item.feed.id_feedback.toString()}
            renderItem={({item}) => (
              <FeedbackItem feedback={item} user={this.state.user} />
            )}
            refreshing={this.state.isLoading}
            onRefresh={this.componentDidMount}
            initialNumToRender={this.state.feedbacks.length}
          />
          <Text style={{textAlign: 'center', fontWeight: '600', fontSize: 20}}>
            {this.state.msgNotFound}
          </Text>
        </Card>

        <Overlay
          overlayStyle={{height: 400}}
          isVisible={this.state.visible}
          onBackdropPress={this.toggleOverlay}>
          <View style={{justifyContent: 'center'}}>
            <AirbnbRating
              count={5}
              reviews={['Terrible ', ' Mauvais ', ' Meh ', ' OK ', ' Bon']}
              defaultRating={0}
              size={20}
              onFinishRating={value => {
                return this.setState({rate: value});
              }}
            />

            <TextInput
              style={{
                borderWidth: 1,
                padding: 10,
                maxHeight: 150,
                height: 150,
                textAlignVertical: 'top',
                borderRadius: 10,
              }}
              placeholder="Laisser votre feedback"
              multiline={true}
              onChangeText={value => {
                if (value !== '') {
                  return this.setState({content: value, disabled: false});
                } else {
                  this.setState({disabled: true});
                }
              }}
            />
            <Button
              disabled={this.state.disabled}
              onPress={() => {
                this.addFeedback();
              }}
              title="Envoyer"
              style={{
                height: 50,
                marginTop: 30,
                backgroundColor:
                  this.state.disabled === false ? '#F4511E' : '#FFCCBC',
                borderColor: '#fff',
              }}
              textStyle={{color: '#fff', fontSize: 20}}>
              Envoyer
            </Button>
          </View>
        </Overlay>
      </View>
    );
  }
}

export default Feedback;
