/* @flow */
'use strict';

var React = require('react-native');
var { Icon } = require('react-native-icons');

var {
  Text,
  View,
  StyleSheet,
} = React;

var Money = React.createClass({

  propTypes: {
    charityAmount: React.PropTypes.number.isRequired,
    id: React.PropTypes.number.isRequired,
  },

  render: function(){
    return(
      <View style={styles.iconText}>
        <Icon
          name='material|money'
          size={15}
          style={styles.icon} />
        <Text style={styles.socialText}>{this.props.charityAmount * 100 + '\u00A2'}</Text>
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

module.exports = Money;