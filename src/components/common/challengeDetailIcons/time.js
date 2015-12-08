/* @flow */
'use strict';

var React = require('react-native');
var { Icon } = require('react-native-icons');
var Moment = require('moment');

var {
  Text,
  View,
  StyleSheet,
} = React;

var Time = React.createClass({

  propTypes: {
    issuedDate: React.PropTypes.string.isRequired,
    expiresDate: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
  },

  getInitialState: function(){
    return {
      expires: Moment(this.props.expiresDate),
    };
  },

  render: function(){
    return(
      <View style={styles.iconText}>
        <Icon
        name='material|time'
        size={15}
        style={styles.icon} />
       <Text style={styles.socialText}>{this.state.expires.fromNow()}</Text>
     </View>
    );
  },

});

var styles = StyleSheet.create({
  socialText: {
    alignSelf: 'center',
    color: '#546979',
    fontSize: 14,
    paddingLeft: 3,
  },
  iconText: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 15,
    height: 15,
  },
});

module.exports = Time;