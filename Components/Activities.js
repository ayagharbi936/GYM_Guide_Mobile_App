/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ActivityItem from './ActivityItem';
const {width} = Dimensions.get('window');
class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      courseDetail: [],
      msgNotFound: '',
    };
  }

  _displayDetailForCourse = course => {
    this.props.navigation.navigate('activityDetail', {course: course});
  };
  DisplayTitle() {
    if (this.state.courseDetail.length === 0) {
      return <Text style={styles.title_text}>Découvrir nos activités</Text>;
    }
  }
  componentDidMount = async () => {
    fetch(
      'http://stage.t-cody.com/api/courses/' +
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
        if (responseJson.success.length === 0) {
          this.setState({
            msgNotFound: 'aucune activité est trouvée pour le moment',
          });
        } else {
          this.setState({
            courses: responseJson.success,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <View style={styles.main_container}>
        <TouchableOpacity>
          <Ionicons
            style={{marginLeft: 10, marginTop: 20, marginBottom: 20}}
            name="md-arrow-back"
            size={35}
            color="#212121"
            onPress={() => this.props.navigation.goBack()}
          />
        </TouchableOpacity>
        <Text style={styles.title_text}>Découvrir nos activités</Text>
        <Text style={{textAlign: 'center', fontWeight: '600', fontSize: 20}}>
          {this.state.msgNotFound}
        </Text>

        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {this.state.courses.map((item, key) => (
            <ActivityItem
              key={item.id_cours}
              width={width}
              course={item}
              displayDetailForCourse={this._displayDetailForCourse}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundIMG: {
    width: '100%',
    height: '100%',
  },
  main_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 400,
    margin: 5,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,

    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center',
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15,
    fontSize: 17,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  yellowBtn: {
    width: 250,
    backgroundColor: '#F4511E',
    borderColor: '#F4511E',
    height: 50,
  },

  yellowTxtBtn: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.3)',
  },
});

export default Activities;
