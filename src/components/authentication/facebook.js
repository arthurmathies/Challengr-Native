/* @flow */
'use strict';

var React = require('react-native');
// var FBLogin = require('react-native-facebook-login');

var {
  StyleSheet,
  View,
} = React;

var FacebookLogin = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>asdf</Text>
      </View>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});


module.exports = FacebookLogin;
