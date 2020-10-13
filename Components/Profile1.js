/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import styles from '../Style/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

class Profile1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      visible: false,
      isLoading: true,
      list: [
        {
          title: 'Abonnement',
          icon: 'check-square-o',
          action: 'user',
          isLogout: false,
          color: '#aaa69d',
        },
        {
          title: 'Mes évènements  ',
          icon: 'calendar-check-o',
          action: 'userevent',
          isLogout: false,
          color: '#aaa69d',
        },
        {
          title: 'Deconnexion',
          icon: 'power-off',
          action: '',
          isLogout: true,
          color: '#F4511E',
        },
      ],
    };
  }
  action(action, isLogout) {
    if (isLogout === false) {
      this.props.navigation.navigate(action);
    } else {
      this._logout();
    }
  }
  componentDidMount = async () => {
    this.setState({isLoading: true});
    try {
      const value = await AsyncStorage.getItem('user');

      if (value !== null) {
        // We have data!!
        this.setState({user: JSON.parse(value)});
      }
    } catch (error) {
      console.log('Error retrieving data');
    }
    this.setState({isLoading: false});
  };
  _logout() {
    AsyncStorage.removeItem('user');
    this.props.navigation.navigate('visitor');
  }

  render() {
    return (
      <View style={(styles.main_container, {margin: 20})}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={this.componentDidMount}
            />
          }>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity>
              <Ionicons
                name="md-arrow-back"
                size={35}
                color="#212121"
                onPress={() => this.props.navigation.goBack()}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather
                name="edit-3"
                size={30}
                color="#212121"
                onPress={() => this.props.navigation.navigate('profile')}
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Avatar
              containerStyle={{marginRight: 20}}
              size={100}
              rounded
              icon={{name: 'user', type: 'font-awesome'}}
              activeOpacity={0.7}
              source={{
                uri:
                  this.state.user.imageSrc === null
                    ? 'null'
                    : this.state.user.imageSrc,
              }}
            />
            <Text style={{fontWeight: 'bold', fontSize: 26, marginTop: 20}}>
              {this.state.user.name}
            </Text>
          </View>
          <View style={{marginTop: 60}}>
            {this.state.list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{
                  name: item.icon,
                  type: 'font-awesome',
                  color: item.color,
                }}
                bottomDivider
                chevron
                onPress={() => {
                  this.action(item.action, item.isLogout);
                }}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Profile1;
