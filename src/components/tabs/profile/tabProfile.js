/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  NavigatorIOS,
} = React;

var Profile = require('./profile');

var TabProfile = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        navigationBarHidden={false}
        tintColor={'#FFFFFF'}
        titleTextColor={'#FFFFFF'}
        barTintColor={'#47A0DB'}
        style={styles.container}
        initialRoute={{
          component: Profile,
          title: 'Profile',
          passProps: { myProp: 'foo' },
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = TabProfile;
