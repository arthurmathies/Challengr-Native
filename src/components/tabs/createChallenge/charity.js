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
var Link = require('../../common/link');

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
    return (
      <View style={styles.container}>
        {this._renderCharities(this.state.charities)}
      </View>
    );
  },

  _renderCharities: function(CHARITIES){
    return (
      <Carousel style={{width: width, height: height}}>
        {
          _.map(CHARITIES, (charity) => (
            <TouchableHighlight
              onPress={() => this.selectCharity(charity)}>

              <View style={styles.charity}>

                <Text style={styles.textHeader}>{charity.name}</Text>

                <Text style={styles.textParagraph}>{charity.description}</Text>

                <Link
                  underlayColor={'transparent'}
                  text={_.trim(charity.link, 'https://www./')}
                  onPress={this.goToLink(charity.link)}/>  

                <Image 
                  style={styles.charityPhoto}
                  source={{uri: charity.imgUrl}} />

              </View>

            </TouchableHighlight>
          ) 
        )}
      </Carousel>
    );
  },

  goToLink: function(link){

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
    marginTop: 60,
  },
  charity: {
    flex: 1,
    padding: 10,
    height: height - 110,
    backgroundColor: '#F3F3F3',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  charityPhoto: {
    width: 100, 
    height: 100,
    borderRadius: 50,
  },

  // TExt
  textHeader: {
    color: 'rgba(84, 105, 121, 1)',
    fontSize: 22,
  },
  textParagraph: {
    color: 'rgba(84, 105, 121, 0.8)',
    fontSize: 16,
    textAlign: 'center',
  }


});

module.exports = Charity;