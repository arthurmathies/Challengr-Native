/* @flow */
'use strict';

var React = require('react-native');
var Carousel = require('../../common/carousel');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var _ = require('lodash');

var {
  StyleSheet,
  View,
  Text,
  ListView,
  AsyncStorage,
  ActivityIndicatorIOS,
  TouchableHighlight,
  AlertIOS,
  Image,
} = React;

var API = require('../../../api/charity/charity');

var Charity = React.createClass({

  componentDidMount: function(){
    var self = this;
    self.state.isLoading = true;
    AsyncStorage.getItem('token')
      .then((token) => {
        API.getCharities(token)
          .then(function(charities){
            console.log('charities : ', charities);
            self.state.isLoading = false;
            self.setState({
              charities: charities,
            })
          })
      }).done();
  },

  getInitialState: function(){
    return {
      selectedCharity: '',
      isLoading: false,
      charities: []
    }
  },

  render: function() {

    var CHARITIES = this.state.charities;

    return (
      <Carousel style={{width: width, height: height}}>
        {
          _.map(CHARITIES, (charity) => (
            <TouchableHighlight
              style={styles.charity}
              onPress={() => this.selectCharity(charity)}>
              <View >
                <Text>{charity.name}</Text>
                <Image 
                  style={styles.charityPhoto}
                  source={{uri: charity.imgUrl}} />
                <Text>{charity.description}</Text>
                <Text>{charity.link}</Text>
              </View>
            </TouchableHighlight>
          ) 
        )}
      </Carousel>
    );
  },

  selectCharity: function(charity){
    this.setState({
      selectedCharity: charity
    })

    // show alert saying do you really want to choose this charity?
    AlertIOS.alert(
      'Donate to ' + charity.name + ' ?',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Button Pressed!')},
        {text: 'Continue', onPress: () => {
          this._nextRoute();
        }},
      ]
    )

  },

  _nextRoute: function(){
    console.log('send...');
    // this.props.navigator.push({
    //   title: 'Select Charity',
    //   component: Charity,
    //   passProps: {challengeType: this.state.type}
    // });
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  charity: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BADA55', 
    width: width, 
    height: height
  },

  charityPhoto: {
    width: 150, 
    height: 150,
  },



});

module.exports = Charity;