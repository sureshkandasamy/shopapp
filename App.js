import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', pwd: '', btnPressed: 0};
    this.submitClick = this.submitClick.bind(this);
    this.getMoviesFromApiAsync = this.getMoviesFromApiAsync.bind(this);
    this.login = this.login.bind(this);
  }

  submitClick()
  {
    alert('submit clicked');
    this.setState({username : 'Test User'});
    // this.setState({username:this.state.username})
    //this.getMoviesFromApiAsync();
    this.login();
  }

  getMoviesFromApiAsync() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.movies);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  login()
  {
    fetch('http://192.168.0.15:8080/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": "test",
        "password": "test"
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize:30, paddingBottom:60 }}>Login</Text>
        </View>
        <View style={{paddingBottom:40}}>
          <Text style={{ fontWeight: 'bold', fontSize:20}}>Username:</Text>
          <TextInput
            style={{height: 40, width:100}}
            placeholder="Username"
            onChangeText={(username) => this.setState({username})}
          />
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize:20}}>Password:</Text>
          <TextInput
            style={{height: 40, width:100}}
            placeholder="Password"
            onChangeText={(pwd) => this.setState({pwd})}
          />
        </View>
        <Text>{this.state.username}</Text>
        <View>
          <Button
            onPress={this.submitClick }
            title="Login"
            color="black"
            accessibilityLabel="Press to Login"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
});
