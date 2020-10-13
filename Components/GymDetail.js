/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import {ImageBackground} from 'react-native';
import Button from 'apsl-react-native-button';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class GymDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      favorite: '',
      favoriteGym: '',
      fav: false,
    };
  }
  componentDidMount = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('user'));

    if (user !== null) {
      fetch('http://stage.t-cody.com/api/favoritegym/' + user.id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())

        .then(responseJson => {
          this.setState({
            favorite: responseJson,
          });
        })
        .finally(() => {
          this.setState({
            favoriteGym: this.state.favorite.find(
              gym => gym.id_gym === this.props.route.params.gym.id_gym,
            ),
          });

          if (this.state.favoriteGym !== undefined) {
            this.setState({fav: true});
          }
        })

        .catch(error => {
          console.log(error);
        });
      this.setState({
        user: user,
      });
    }
  };
  deleteFavorite(idfavorite) {
    fetch('http://stage.t-cody.com/api/deleteFavorite/' + idfavorite, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).catch(error => {
      console.log(error);
    });
  }
  addFavorite() {
    fetch('http://stage.t-cody.com/api/addFavorite', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_gym: this.props.route.params.gym.id_gym,
        id: this.state.user.id,
      }),
    })
      .then(response => response.json())

      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
  }
  ToggleFunction = () => {
    if (this.state.fav === true) {
      console.log(this.state.favoriteGym.id_favorite);
      this.deleteFavorite(this.state.favoriteGym.id_favorite);
      this.setState({
        fav: false,
      });
    } else {
      this.addFavorite();
      this.setState({
        fav: true,
      });
    }
  };
  render() {
    const {gym} = this.props.route.params;

    return (
      <View style={styles.main_container}>
        <ImageBackground
          source={{uri: gym.image_src}}
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
              flex: 2,
            }}>
            <Text style={styles.title_text}>{gym.name}</Text>
            <Icon
              name={this.state.fav ? 'heart' : 'heart-o'}
              type="font-awesome"
              size={30}
              color="#F4511E"
              onPress={() => {
                if (this.state.user === null) {
                  this.props.navigation.navigate('connexion');
                } else {
                  this.ToggleFunction();
                }
              }}
            />
            <Text style={styles.description_text}>{gym.description}</Text>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginLeft: 20,
                marginTop: 10,
              }}>
              <Entypo
                name="old-phone"
                size={25}
                color="#212121"
                onPress={() => this.props.navigation.goBack()}
              />
              <Text style={{fontSize: 18, marginLeft: 10, color: '#212121'}}>
                <Text style={{fontWeight: 'bold'}}>+216 </Text>
                {gym.phone_number}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingTop: 30,
              marginRight: 10,
              marginLeft: 10,
            }}>
            <Button
              style={{
                backgroundColor: '#EEEEEE',
                width: 100,
                borderColor: '#EEEEEE',
                height: 50,
              }}
              textStyle={{color: 'black', fontSize: 20, textAlign: 'center'}}>
              <FontAwesome
                style={{marginLeft: 10, marginTop: 20, marginBottom: 20}}
                name="commenting-o"
                size={35}
                color="#212121"
                onPress={() =>
                  this.props.navigation.navigate('feedbackSalle', {gym: gym})
                }
              />
            </Button>
            <Button
              style={styles.yellowBtn}
              textStyle={styles.yellowTxtBtn}
              onPress={() =>
                this.props.navigation.navigate('activities', {gym: gym})
              }>
              Voir activités
            </Button>
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

export default GymDetail;
