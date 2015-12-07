/* @flow */
'use strict';

var React = require('react-native');
var _ = require('lodash');

var {
  StyleSheet,
  View,
  Text,
  ListView,
  AsyncStorage,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
} = React;

var API = require('../../../api/challenges/challenges');
var DetailChallenge = require('../../common/detailChallenge');
var ListChallenge = require('../../common/listChallenge');

var Activity = React.createClass({

  componentDidMount: function(){
    var self = this;
    // Loader
    self.state.isLoading = true;
    // Async Storage
    AsyncStorage.getItem('token')
      .then((token) => {
        // API
        API.getAllChallenges(token)
          .then(function(challenges){
            console.log('all challenges : ', challenges);
            // Loader
            self.state.isLoading = false;
            // State
            self.setState({
              dataSource: self.getDataSource(challenges),
            })
          })
      })
      .done();
  },

  getInitialState: function(){
    return {
      isLoading: false,
      photoURL: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <ListView
          renderSeparator={this._renderSeparator}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderFooter={this._renderFooter}
        />
      </View>
    );
  },

  _renderRow: function(rowData){    
    return  <ListChallenge 
              rowData={rowData}
              showDetailView={this._showDetailView}
              token={this.state.token} />
  },

  _showDetailView: function(challenge){
    this.props.navigator.push({
      title: _.capitalize(challenge.title),
      component: DetailChallenge,
      passProps: {challenge: challenge}
    });
  },

  _renderFooter: function(){
    if (this.state.isLoading === true) {
      return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
    }
  },

  _renderSeparator: function(){
    return <View style={styles.separator}/>
  },

  getDataSource: function(challenges: Array<any>): ListView.DataSource{
    return this.state.dataSource.cloneWithRows(challenges);
  }

});

var styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    marginTop: 60,
  },

  // Utility
  scrollSpinner: {
    marginVertical: 20,
  },

  separator: {
    backgroundColor: 'rgba(216, 216, 216, 1)',
    height: 1,
    marginLeft: 80,
  }

});

module.exports = Activity;
