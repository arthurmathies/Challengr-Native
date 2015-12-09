/* @flow */
'use strict';

var React = require('react-native');
var _ = require('lodash');

var {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
} = React;

var API = require('../../../api/challenges/challenges');
var DetailChallenge = require('../../common/challengeViews/detailChallenge');
var ListChallenge = require('../../common/challengeViews/listChallenge');

var Activity = React.createClass({

  componentDidMount: function(){
    // Loader
    this.setState({
      isLoading: true
    });
    var poll = function (){
      API.getAllChallenges()
      .then((challenges) => {
        // console.log('all challenges : ', challenges);
        // Loader
        this.setState({
          isLoading: false,
          dataSource: this.getDataSource(challenges),
        });
      })
      .done();      
    }.bind(this);
    poll();
    this.setState({
      interval: setInterval(poll, 10000),
    });

  },

  getInitialState: function(){
    return {
      isLoading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      interval: null,
    };
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
              showDetailView={this._showDetailView}/>
  },

  _showDetailView: function(challenge){
    this.props.navigator.push({
      title: _.capitalize(challenge.title),
      component: DetailChallenge,
      passProps: {
        challenge: challenge,
      },
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
  },

  componentWillUnmount: function(){
    clearInterval(this.state.interval);
  },

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
