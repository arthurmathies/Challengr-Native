/* @flow */
'use strict';

var React = require('react-native');
var Activity = require('./activity');

var {
  StyleSheet,
  View,
  Text,
  NavigatorIOS,
} = React;

var TabActivity = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: Activity,
          title: 'Activity',
          passProps: { myProp: 'foo' },
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = TabActivity;