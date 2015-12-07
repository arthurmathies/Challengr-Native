/* @flow */
'use strict';

var React = require('react-native');
var RNFS = require('react-native-fs');

var path = RNFS.DocumentDirectoryPath;
var path2 = RNFS.MainBundlePath;

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

var SearchBar = require('SearchBar');
var API = require('../../../api/user/user');
var CreateChallenge = require('./createChallenge');

var ChooseFriend = React.createClass({

  componentDidMount: function(){
    var self = this;
    // Loader
    self.state.isLoading = true;
    // Async Storage
    AsyncStorage.getItem('token')
      .then((token) => {
        // API
        API.getFriends(token)
          .then(function(friends){
            // Loader
            self.state.isLoading = false;
            // State
            self.setState({
              dataSource: self.getDataSource(friends),
            })
          })

      })
      .done();
  },

  getInitialState: function(){
    return {
      isLoading: false,
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      filter: '',
    }
  },

  render: function() {

    console.log('PATH : ', path);
    console.log('PATH 2: ', path2);

    return (
      <View style={styles.container}>
        <SearchBar
          onSearchChange={this.onSearchChange}
          placeholder={'search friends...'}
          onFocus={() => {
            this.refs.listview && this.refs.listview.getScrollResponder().scrollTo(0, 0)
          }}
        />
        <View style={styles.separator} />
        <ListView
          ref="listview"
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          renderFooter={this._renderFooter}
        />
      </View>
    );
  },

  selectFriend: function(friend){
    this.props.navigator.push({
      title: 'Challenge',
      component: CreateChallenge,
      passProps: {friend: friend}
    });
  },

// LIST VIEW
  _renderRow: function(friend){
    return (
      <TouchableHighlight
        key={friend.id}
        onPress={() => this.selectFriend(friend)}
        underlayColor='transparent'>
        <View style={styles.row}>
          <View style={styles.leftRow}>
            <Image 
              style={styles.rowPhoto}
              source={{uri: friend.photoURL}} />
          </View>
          <View style={styles.rightRow}>
            <Text style={styles.text}>{friend.firstName} {friend.lastName}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  },

  _renderSeparator: function(){
    return <View style={styles.rowSeparator}/>
  },

  _renderFooter: function(){
    if (this.state.isLoading === true) {
      return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
    }
  },

  getDataSource: function(friends: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(friends);
  },

// SEARCH BAR
  onSearchChange: function(event) {
    var filter = event.nativeEvent.text.toLowerCase();
    this.searchFriends(filter);
  },

  searchFriends: function(query){
    this.setState({
      isLoading: false,
      filter: query
    });
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Utility
  scrollSpinner: {
    marginVertical: 20,
  },

  separator: {
    height: 1,
    backgroundColor: 'rgba(216, 216, 216, 1)',
  },

  rowSeparator: {
    backgroundColor: 'rgba(216, 216, 216, 0.3)',
    height: 1,
    marginLeft: 80,
  },

  // Row
  row: {
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },

  leftRow: {
    flex: 1,
    alignSelf: 'center',
  },
  rowPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  rightRow: {
    flex: 4,
    alignSelf: 'center',
  },

  // Text
  text: {
    color: '#546979',
    fontSize: 22,
  },

});

module.exports = ChooseFriend;
