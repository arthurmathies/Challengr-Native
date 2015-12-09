/* @flow */
'use strict';

var React = require('react-native');
var { Icon } = require('react-native-icons');

var {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} = React;

var API = require('../../../api/challenges/challenges');

var Like = React.createClass({

  propTypes: {
    likes: React.PropTypes.number.isRequired,
    id: React.PropTypes.number.isRequired,
  },

  getInitialState: function(){
    return {
      likes: this.props.likes,
    };
  },

  render: function(){
    return(
      <TouchableHighlight
        onPress={() => this.increaseLike(this.state.likes)}
        style={styles.iconText}
        underlayColor='transparent'>
        <View style={styles.iconText}>
          {this.renderHeartIcon()}
          <Text style={styles.socialText}>{this.state.likes}</Text>
        </View>
      </TouchableHighlight>
    );
  },  

  renderHeartIcon: function(){
    if (this.state.likes > 0) {
      return (<Icon
        name='material|favorite'
        size={15}
        color={'red'}
        style={styles.icon} />);
    } else {
      return (<Icon
        name='material|favorite-outline'
        size={15}
        style={styles.icon} />);
    } 
  },

  increaseLike: function(likes){
    var updateObj = {
      id: this.props.id,
      likes: likes + 1, 
    };

    API.updateChallenge(updateObj)
    .then((resp) => {
      if(resp.success === true) {
        this.setState({
          likes: likes + 1,
        });
      }
    })
    .done();
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

module.exports = Like;