/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {Avatar, Rating} from 'react-native-elements';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

class FeedbackItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  deleteFeedback(idFeedback) {
    fetch('http://stage.t-cody.com/api/deleteFeedback/' + idFeedback, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).catch(error => {
      console.log(error);
    });
  }
  render() {
    const {feedback, user} = this.props;

    return (
      <View style={styles.main_container}>
        <View style={styles.content_container}>
          {user !== null && user.id === feedback.user.id ? (
            <EvilIcons
              style={{alignSelf: 'flex-end'}}
              name="close-o"
              size={25}
              color="#212121"
              onPress={() => {
                Alert.alert(
                  '',
                  'Supprimer le feedback ?',
                  [
                    {
                      text: 'Annuler',

                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () =>
                        this.deleteFeedback(feedback.feed.id_feedback),
                    },
                  ],
                  {cancelable: false},
                );
              }}
            />
          ) : null}

          <View style={styles.header_container}>
            <Avatar
              rounded
              source={{
                uri: feedback.user.imageSrc,
              }}
              size="medium"
            />
            <View>
              <Text style={styles.title_text}>{feedback.user.name} </Text>
              <Rating
                style={{marginLeft: 10}}
                imageSize={10}
                readonly
                startingValue={feedback.feed.rate}
              />
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>{feedback.feed.created_at}</Text>
            </View>
          </View>

          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>
              {feedback.feed.content}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <EvilIcons
              style={{marginRight: 10}}
              name="location"
              size={25}
              color="#212121"
            />
            <Text style={{color: '#212121'}}>{feedback.gym.name}</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default FeedbackItem;
const styles = StyleSheet.create({
  main_container: {
    height: 205,
    flexDirection: 'row',
    borderBottomColor: '#333333',
    borderBottomWidth: 0.5,
    padding: 10,
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray',
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    marginLeft: 20,
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666',
  },
  description_container: {
    flex: 7,
    marginTop: 20,
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14,
  },
});
