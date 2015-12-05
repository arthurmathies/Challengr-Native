/* @flow */
'use strict';

var React = require('react-native');
var { Icon } = require('react-native-icons');

var {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  AlertIOS,
} = React;

var Button = require('../common/button');
var Moment = require('moment');

var DetailChallenge = React.createClass({

  getInitialState: function(){
    return {
      title: this.props.challenge.title,
      type: this.props.challenge.type,
      Challenger: this.props.challenge.Challenger,
      Challenged: this.props.challenge.Challenged,
      description: this.props.challenge.description,
      charityAmount: this.props.challenge.charityAmount,
      expiresDate: this.props.challenge.expiresDate,
      likes: this.props.challenge.likes,
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {this._renderMain()}
        {this._renderFooter()}
      </View>
    );
  },

  _renderHeader: function(){

    var issue = Moment(this.state.issuedDate);
    var expire = Moment(this.state.expiresDate);

    return(
      <View style={styles.header}>

        <View style={styles.images}>
          <Image 
            style={styles.challengedPhoto}
            source={{uri: this.state.Challenged.photoURL}} />

          <Image 
            style={styles.challengerPhoto}
            source={{uri: this.state.Challenger.photoURL}} />
        </View>

        <View style={styles.iconText}>
          <Icon
          name='material|time'
          size={15}
          style={styles.icon} />
          <Text style={styles.socialText}>{expire.fromNow()}</Text>
        </View>

        <View style={styles.iconText}>
          <Icon
            name='material|money'
            size={15}
            style={styles.icon} />
          <Text style={styles.socialText}>{this.state.charityAmount * 100}</Text>
        </View>

        <TouchableHighlight
          style={styles.iconText}
          underlayColor='transparent'>
          <View style={styles.iconText}>
            {this.renderHeartIcon()}
            <Text style={styles.socialText}>{this.state.likes}</Text>
          </View>
        </TouchableHighlight>

      </View>
    )
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

  _renderMain: function(){
    return(
      <ScrollView
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle={200}
        style={styles.main}>
        <Text>{this.state.type}</Text>
        <Text>{this.state.description}</Text>
      </ScrollView>
    )
  },

  _renderFooter: function(){
    return(
      <View style={styles.footer}>
        <Button
          text={'Challenge Completed ?'}
          onPress={this.challengeComplete}/>
      </View>
    )
  },

  challengeComplete: function(){
    // show alert saying do you really want to choose this charity?
    AlertIOS.alert(
      'Have they completed the challenge?',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Button Pressed!')},
        {text: 'Yes', onPress: () => {
          console.log('complete the challenge...');
        }},
      ]
    )
  },

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header
  header: {
    flex: 1,
    marginTop: 66,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  // Challenged and Challenger Images
  images: {
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  challengerPhoto: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  challengedPhoto: {
    flex: 1,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: 'center',
  },

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

  // icon
  icon: {
    width: 15,
    height: 15,
  },

  // Main
  main: {
    flex: 2,
    padding: 10,
  },
  // Footer
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 49,
  },
});


module.exports = DetailChallenge;