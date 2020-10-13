/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {Input, ListItem, Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../Style/styles';

class SearchAdv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gyms: [],
      input: '',
    };
  }
  _displayDetailForGym(gym) {
    this.props.navigation.navigate('gymdetail', {
      gym: gym,
      user: this.state.user,
    });
  }
  Search(name) {
    fetch('http://stage.t-cody.com/api/searchAdv/' + name, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          gyms: responseJson.data,
          input: 'le cours de  ' + this.state.value + ' est disponible dans:',
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity>
            <Ionicons
              style={{marginRight: 10}}
              name="md-arrow-back"
              size={30}
              color="#212121"
              onPress={() => this.props.navigation.goBack()}
            />
          </TouchableOpacity>
          <Input
            onChangeText={value => {
              if (value !== '') {
                this.Search(value);
                this.setState({
                  value: value,
                });
              } else {
                this.setState({
                  gyms: [],
                });
              }
            }}
            inputContainerStyle={{
              width: 290,
              borderWidth: 1,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 290,
            }}
            placeholder="Chercher"
            leftIcon={<Ionicons name="md-search" size={25} color="#212121" />}
          />
        </View>
        <Text style={{fontSize: 20, marginTop: 10, marginLeft: 20}}>
          {this.state.input}
        </Text>
        <View style={{marginTop: 30}}>
          {this.state.gyms.map((item, i) => {
            return (
              <ListItem
                onPress={() => {
                  this._displayDetailForGym(item);
                }}
                containerStyle={{
                  margin: 10,
                  borderRadius: 20,
                  backgroundColor: '#fff',
                }}
                key={i}
                title={item.name}
                leftElement={
                  <Image
                    source={{
                      uri: item.image_src,
                    }}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 15,
                    }}
                  />
                }
                rightIcon={{
                  name: 'arrow-forward',
                  size: 20,

                  color: '#212121',
                }}
                subtitle={
                  <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Icon name="location" type="evilicon" color="#517fa4" />
                    <Text>{item.adress}</Text>
                  </View>
                }
                bottomDivider
              />
            );
          })}
        </View>
      </View>
    );
  }
}

export default SearchAdv;
