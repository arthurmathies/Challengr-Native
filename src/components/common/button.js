var React = require('react-native');

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
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    marginTop: 10,
    width: 200,
    height: 40,
  },
  buttonText: {

  }
});