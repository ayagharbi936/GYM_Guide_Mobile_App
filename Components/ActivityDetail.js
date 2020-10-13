/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import {ImageBackground} from 'react-native';
import {Icon} from 'react-native-elements';

class ActivityDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {course} = this.props.route.params;

    return (
      <View style={styles.main_container}>
        <ImageBackground
          source={{uri: course.image_src}}
          style={(styles.backgroundIMG, {flex: 1})}>
          <TouchableOpacity>
            <Ionicons
              style={{marginLeft: 10, marginTop: 20, marginBottom: 20}}
              name="md-arrow-back"
              size={35}
              color="#212121"
              onPress={() => this.props.navigation.goBack()}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            top: -30,
            backgroundColor: 'white',
            borderRadius: 25,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <ScrollView>
              <Text style={styles.title_text}>{course.name}</Text>

              <Text style={styles.description_text}>{course.description}</Text>
              <View style={{width: 320, marginTop: 10, marginLeft: 25}}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <FontAwesome name="clock-o" size={35} color="#F4511E" />

                  <Text style={{fontSize: 20, marginLeft: 20}}>
                    <Text style={{fontWeight: 'bold'}}>Durée du cours: </Text>
                    {course.duration}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <FontAwesome5 name="user-friends" size={27} color="#F4511E" />
                  <Text style={{fontSize: 20, marginLeft: 20}}>
                    <Text style={{fontWeight: 'bold'}}>Cible: </Text>
                    {course.target}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <FontAwesome5 name="tshirt" size={27} color="#F4511E" />
                  <Text style={{fontSize: 20, marginLeft: 20}}>
                    <Text style={{fontWeight: 'bold'}}>
                      Tenue recommandée:{' '}
                    </Text>
                    {course.recommended_outfit}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <Feather name="activity" size={30} color="#F4511E" />
                  <Text style={{fontSize: 20, marginLeft: 20}}>
                    <Text style={{fontWeight: 'bold'}}>Fréquence: </Text>
                    {course.frequency}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <FontAwesome5 name="money-bill" size={30} color="#F4511E" />
                  <Text style={{fontSize: 20, marginLeft: 20}}>
                    <Text style={{fontWeight: 'bold'}}>Prix/mois: </Text>
                    {course.price_month}
                  </Text>
                  <Text style={{fontSize: 20, marginLeft: 20}}>
                    <Text style={{fontWeight: 'bold'}}>Prix/année: </Text>
                    {course.price}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
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
});

export default ActivityDetail;
