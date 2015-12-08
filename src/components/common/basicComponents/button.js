var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var { Icon } = require('react-native-icons');

var {
  Text,
  StyleSheet,
  TouchableHighlight,
  View,
} = React;

module.exports = React.createClass({

  render: function(){
    return(
      <TouchableHighlight 
        style={styles.button}
        underlayColor={'gray'}
        onPress={this.props.onPress}>
        <View style={styles.showRow}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
          {this._renderIcon()}
        </View>
      </TouchableHighlight>
    );
  },

  _renderIcon: function(){
    if (this.props.icon === true) {
      return (
        <Icon
          name='material|chevron-right'
          size={20}
          color={'white'}
          style={styles.icon} />
      )
    }
  },

});

var styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: width,
    height: 50,
    backgroundColor: '#546979',
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },

  // Display Row
  showRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // icon
  icon: {
    width: 15,
    height: 15,
    right: 0,
  },
});