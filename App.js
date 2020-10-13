/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import Screen1 from './Components/Screen1';
import Connexion from './Components/Connexion';
import Inscription from './Components/Inscription';
import Screen3 from './Components/Screen3';
import Screen2 from './Components/Screen2';
import Event from './Components/Event';
import Community from './Components/Community';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import VisitorScreen from './Components/VisitorScreen';
import User from './Components/User';
import Profile from './Components/Profile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EventDetail from './Components/EventDetail';
import Search from './Components/Search';
import GymDetail from './Components/GymDetail';
import Activities from './Components/Activities';
import ActivityDetail from './Components/ActivityDetail';
import Profile1 from './Components/Profile1';
import Feedback from './Components/Feedback';
import Favorites from './Components/Favorites';
import AddEvent from './Components/AddEvent';
import UserEvent from './Components/UserEvent';
import SearchAdv from './Components/SearchAdv';
import SplashScreen from './Components/SplashScreen';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

class App extends Component {
  createHomeStack = () => (
    <Stack.Navigator
      initialRouteName="splashscreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="splashscreen" component={SplashScreen} />
      <Stack.Screen name="eventdetail" component={EventDetail} />
      <Stack.Screen name="addevent" component={AddEvent} />
      <Stack.Screen name="userevent" component={UserEvent} />
      <Stack.Screen name="gymdetail" component={GymDetail} />
      <Stack.Screen name="activities" component={Activities} />
      <Stack.Screen name="activityDetail" component={ActivityDetail} />
      <Stack.Screen name="feedbackSalle" component={Feedback} />

      <Stack.Screen name="screen1" component={Screen1} />
      <Stack.Screen name="screen2" component={Screen2} />
      <Stack.Screen name="screen3" component={Screen3} />
      <Stack.Screen name="search" component={Search} />
      <Stack.Screen name="searchAdv" component={SearchAdv} />

      <Stack.Screen name="connexion" component={Connexion} />
      <Stack.Screen name="inscription" component={Inscription} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="profile1" component={Profile1} />

      <Stack.Screen name="visitor" children={this.createBottomTabs} />
      <Stack.Screen name="user" children={this.createBottomTabs2} />
    </Stack.Navigator>
  );
  createBottomTabs = () => {
    return (
      <BottomTabs.Navigator
        tabBarOptions={{
          activeTintColor: '#F4511E',
        }}>
        <BottomTabs.Screen
          name="discover"
          style={{marginBottom: 16}}
          component={VisitorScreen}
          options={{
            tabBarLabel: 'Découvrir',
            tabBarIcon: ({color}) => (
              <FontAwesome color={color} size={30} name={'compass'} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="community"
          component={Community}
          options={{
            tabBarLabel: 'Communauté',
            tabBarIcon: ({color}) => (
              <FontAwesome color={color} size={30} name={'comments-o'} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="event"
          component={Event}
          options={{
            tabBarLabel: 'Evénements',
            tabBarIcon: ({color}) => (
              <FontAwesome color={color} size={30} name={'calendar'} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    );
  };
  createBottomTabs2 = () => {
    return (
      <BottomTabs.Navigator
        tabBarOptions={{
          activeTintColor: '#F4511E',
        }}>
        <BottomTabs.Screen
          name="discover"
          style={{marginBottom: 16}}
          component={User}
          options={{
            tabBarLabel: 'Découvrir',
            tabBarIcon: ({color}) => (
              <FontAwesome color={color} size={30} name={'compass'} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="community"
          component={Community}
          options={{
            tabBarLabel: 'Communauté',
            tabBarIcon: ({color}) => (
              <FontAwesome color={color} size={30} name={'comments-o'} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="event"
          component={Event}
          options={{
            tabBarLabel: 'Evénements',
            tabBarIcon: ({color}) => (
              <FontAwesome color={color} size={30} name={'calendar'} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="Favories"
          component={Favorites}
          options={{
            tabBarLabel: 'Favories',
            tabBarIcon: ({color}) => (
              <FontAwesome color={color} size={30} name={'heart-o'} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    );
  };

  render() {
    return <NavigationContainer>{this.createHomeStack()}</NavigationContainer>;
  }
}

export default App;
