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
        style={styles.link}
        underlayColor={'gray'}
        onPress={this.props.onPress}>
        <Text style={styles.linkText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  link: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: 200,
    height: 40,
  },
  linkText: {
    color: 'blue',
    fontSize: 18
  }
});