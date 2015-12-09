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
  AsyncStorage,
  TouchableHighlight,
  AlertIOS,
} = React;

var Button = require('../basicComponents/button');
var API = require('../../../api/challenges/challenges');
var Like = require('../challengeDetailIcons/like');
var Money = require('../challengeDetailIcons/money');
var Time = require('../challengeDetailIcons/time');

var DetailChallenge = React.createClass({

  propTypes: {
    challenge: React.PropTypes.object.isRequired,
  },

  componentDidMount: function(){
    AsyncStorage.getItem('email')
      .then((email) => {
        this.setState({
          userEmail: email,
        });
      })
      .done();
  },

  getInitialState: function(){
    return {
      userEmail: '',
      challengeCompleted: this.props.challenge.completed, 
    };
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

    return(
      <View style={styles.header}>

        <View style={styles.images}>
          <Image 
            style={styles.challengedPhoto}
            source={{uri: this.props.challenge.Challenged.photoURL}} />
          <Image 
            style={styles.challengerPhoto}
            source={{uri: this.props.challenge.Challenger.photoURL}} />
        </View>

        <Time
          id={this.props.challenge.id}
          issuedDate={this.props.challenge.issuedDate}
          expiresDate={this.props.challenge.expiresDate} />

        <Money
          id={this.props.challenge.id}
          charityAmount={this.props.challenge.charityAmount} />

        <Like
          id={this.props.challenge.id}
          likes={this.props.challenge.likes} />

      </View>
    )
  },

  _renderMain: function(){
    return(
      <ScrollView
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle={200}
        style={styles.main}>
        <Text style={styles.textHeader}>{this.props.challenge.type}</Text>
        <Text style={styles.textParagraph}>{this.props.challenge.description}</Text>
      </ScrollView>
    )
  },

  _renderFooter: function(){
    if(this.state.userEmail === this.props.challenge.Challenged.email && !this.state.challengeCompleted && !this.props.challenge.notCompleted){
      return(
        <View style={styles.footer}>
          <Button
            icon={false}
            text={'Challenge Completed'}
            onPress={this._challengeCompleted}/>
        </View>
      );
    }
  },

  _challengeCompleted: function(){
    AlertIOS.alert(
      'Have you really completed the challenge?',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Challenge Completion cancelled')},
        {text: 'Yes', onPress: this._markCompleted},
      ]
    );
  },

  _markCompleted: function(){
    var updateObj = {
      id: this.props.challenge.id,
      completed: true,
    };
    API.updateChallenge(updateObj)
    .then((resp) => {
      if(resp.success){
        this.setState({
          challengeCompleted: true,
        });
      }
    })
    .done();
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
    backgroundColor: '#F3F3F3',
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

  // Text
  textHeader: {
    color: 'rgba(84, 105, 121, 1)',
    fontSize: 22,
    textAlign: 'center',
    paddingBottom: 10,
  },
  textParagraph: {
    color: 'rgba(84, 105, 121, 0.8)',
    fontSize: 16,
    textAlign: 'center',
  }

});


module.exports = DetailChallenge;