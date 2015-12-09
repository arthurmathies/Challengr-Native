'use strict';

var React = require('react-native');
var _ = require('lodash');
var { Icon } = require('react-native-icons');

var {
  StyleSheet,
  View,
  AsyncStorage,
} = React;

var ProfileInfo = require('./profileInfo');
var UserChallenges = require('./userChallenges');

var Profile = React.createClass({

  componentDidMount: function(){
    // Async Storage
    AsyncStorage.multiGet(['id', 'email', 'firstName', 'lastName', 'photoURL'])
      .then((valArr) => {
        this.setState({
          email: valArr[1][1],
          firstName: valArr[2][1],
          lastName: valArr[3][1],
          photoURL: valArr[4][1],
        });
      })
      .done();
  },

  getInitialState: function(){
    return {
      email: '',
      firstName: '',
      lastName: '',
      photoURL: '',
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        <ProfileInfo
          email={this.state.email}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          photoURL={this.state.photoURL}
          navigator={this.props.navigator} />
        <UserChallenges
          navigator={this.props.navigator} />
      </View>
    );
  },
  
});

var styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
  },
});

module.exports = Profile;