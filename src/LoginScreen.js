import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FooterButton from './components/FooterButton';
import Toast from 'react-native-easy-toast';

import firebase from 'react-native-firebase';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idText: '이메일',
      pwText: '비밀번호',
      id: '',
      pw: '',
      loading: false,
    };
  }

  handleLogin = () => {
    const {id, pw} = this.state;
    this.setState({loading: true});
    firebase
      .auth()
      .signInWithEmailAndPassword(id, pw)
      .then(() => {
        this.setState({loading: false});
        this.props.navigation.navigate('Main');
      })
      .catch(() => {
        this.setState({loading: false});
        this.toast.show(
          '잘못된 로그인 정보입니다. 다시 로그인 해주세요!',
          1000,
        );
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./icon.png')} style={styles.icon} />
        <Text style={styles.welcomeText}>환영합니다.</Text>
        <TextInput
          style={styles.textInputButton}
          onChangeText={id => this.setState({id})}
          placeholder={this.state.idText}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInputButton}
          onChangeText={pw => this.setState({pw})}
          placeholder={this.state.pwText}
          autoCorrect={false}
          secureTextEntry={true}
        />
        {this.state.loading ? (
          <ActivityIndicator style={styles.loginButton} size="small" />
        ) : (
          <FooterButton
            style={styles.loginButton}
            buttonText="로그인"
            onPress={this.handleLogin}
          />
        )}
        <Text style={styles.noAccountText}>아이디가 없으신가요?</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.makeAccountText}>계정 만들기</Text>
        </TouchableOpacity>
        <Toast
          ref={c => {
            this.toast = c;
          }}
        />
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
    width: 60,
    height: 60,
    marginBottom: 70,
  },
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 23,
  },
  textInputButton: {
    width: 288,
    borderColor: 'gray',
    paddingVertical: 10,
    borderWidth: 0.3,
    paddingHorizontal: 5,
    borderRadius: 2,
    backgroundColor: 'white',
    height: 50,
  },
  loginButton: {
    width: 315,
    height: 50,
    marginTop: 50,
  },
  noAccountText: {
    marginTop: 30,
    fontSize: 12,
    color: '#5B5B5B',
  },
  makeAccountText: {
    fontSize: 12,
    color: '#9013FE',
  },
});
