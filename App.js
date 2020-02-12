import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import MainScreen from './src/MainScreen';
import SettingScreen from './src/SettingScreen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: MainScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignUp: {
    screen: SignupScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Main: {
    screen: MainScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Setting: {
    screen: SettingScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(AppNavigator);
