import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WeatherBox from './components/WeatherBox';
import firebase from 'react-native-firebase';
import Geolocation from 'react-native-geolocation-service';

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('user');
    this.state = {
      isSwitchTurnOn: true,
      user: null,
      weatherIcon: '',
      weatherText: '',
      temperature: null,
      location: null,
    };
  }

  componentDidMount(): void {
    const user = firebase.auth().currentUser;
    if (user) {
      this.setState({user: user._user.email});
    } else {
      console.log('no user');
    }
  }

  onTouchSwitch = () => {
    this.setState({isSwitchTurnOn: !this.state.isSwitchTurnOn});
    this.ref
      .doc(this.state.user)
      .collection('switch-status')
      .add({
        isSwitchTurnOn: this.state.isSwitchTurnOn,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  handleWeatherBox = () => {
    Geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      let api_key = 'd4d6b733c44585c0eca4aeafca863414';
      let url =
        'http://api.weatherstack.com/current?access_key=' +
        api_key +
        '&query=' +
        lat +
        ',' +
        lng;

      fetch(url)
        .then(res => res.json())
        .then(data =>
          this.setState({
            weatherIcon: data.current.weather_icons,
            weatherText: data.current.weather_descriptions,
            temperature: data.current.temperature,
            location: data.location.name,
          }),
        );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <AntDesign name="bells" color="#916FF2" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Setting')}>
            <AntDesign name="setting" color="#916FF2" size={30} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.handleWeatherBox}>
          <WeatherBox
            weatherIcon={this.state.weatherIcon}
            temperature={this.state.temperature}
            weatherText={this.state.weatherText}
            location={this.state.location}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onTouchSwitch}>
          <Image
            source={
              this.state.isSwitchTurnOn
                ? require('./on.png')
                : require('./off.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8D8D8',
  },
  icon: {
    width: 185,
    height: 305,
    marginTop: 30,
  },
  description: {
    fontSize: 16,
    color: '#5B5B5B',
    textAlign: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 20,
    top: 60,
  },
});
