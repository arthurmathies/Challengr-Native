var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
  Text,
  StyleSheet,
  TouchableHighlight,
} = React;

module.exports = React.createClass({
  render: function(){
    return(
      <TouchableHighlight 
        style={styles.button}
        underlayColor={'gray'}
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: width,
    height: 50,
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
  }
});