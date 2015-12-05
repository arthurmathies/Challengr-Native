/* @flow */
'use strict';

var React = require('react-native');
var _ = require('lodash');

var {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  PickerIOS,
} = React;

var Button = require('../../common/button');
var Charity = require('./charity');

var CHALLENGE_TYPES = ['basketball', 'education', 'gym', 'drinking'];

var CreateChallenge = React.createClass({

  getInitialState: function(){
    return {
      title: '',
      description: '',
      type: CHALLENGE_TYPES[0],
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        {this.header()}
        {this.main()}
      </View>
    );
  },

  header: function(){
    return (
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.leftRow}>
            <Image 
              style={styles.rowPhoto}
              source={{uri: this.props.friend.photoURL}} />
          </View>
          <View style={styles.rightRow}>
            <Text>Challenging</Text>
            <Text>{this.props.friend.firstName} {this.props.friend.lastName}</Text>
          </View>
        </View>
      </View>
    )
  },

  main: function(){

    var challengeType = CHALLENGE_TYPES[this.state.type];

    return (
      <View style={styles.main}>

        <PickerIOS
          style={styles.typePicker}
          selectedValue={this.state.type}
          onValueChange={(type) => this.setState({
            type: type
          })}>
          { _.map(CHALLENGE_TYPES, (type) => (
              <PickerIOS.Item
                key={type}
                value={type}
                label={type}>
              </PickerIOS.Item>              
            ) 
          )}

        </PickerIOS>

        <TextInput
          style={styles.textInput}
          placeholder={'title'}
          onChangeText={(text) => this.setState({
            title: text
          })}
          value={this.state.text}
        />

        <TextInput
          style={styles.textInputArea}
          placeholder={'description'}
          multiline={true}
          onChangeText={(text) => this.setState({
            description: text
          })}
        />

        <Button
          text={'Next'}
          onPress={this._nextRoute}/>

      </View>
    )
  },

  _nextRoute: function(){
    console.log('send : ', this.state.type);
    this.props.navigator.push({
      title: 'Select Charity',
      component: Charity,
      passProps: {challengeType: this.state.type}
    });
  }

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header
  header: {
    flex: 1,
    borderBottomColor: 'rgba(216, 216, 216, 1)',
    borderBottomWidth: 1,
    marginTop: 60,
    justifyContent: 'center',
  },

  // Row
  row: {
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: 'row',
  },

  leftRow: {
    flex: 1,
    alignSelf: 'center',
  },
  rowPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  rightRow: {
    flex: 2,
    alignSelf: 'center',
  },

  // main
  main: {
    flex: 3,
    marginBottom: 50,
    padding: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 4,
    paddingLeft: 10,
  },
  textInputArea: {
    paddingLeft: 10,
    height: 80,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 4,
  },
  typePicker: {
    padding: 0,
    margin: 0,
  }

});


module.exports = CreateChallenge;
