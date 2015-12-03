'use strict';

var React = require('react-native');
var _ = require('lodash');

var {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  Image,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;

var API = require('../../../api/challenges/challenges');
var DetailChallenge = require('../detailChallenge');

var Profile = React.createClass({

  componentDidMount: function(){
    var self = this;
    // Loader
    self.state.isLoading = true;
    // Async Storage
    AsyncStorage.multiGet(['id', 'email', 'firstName', 'lastName', 'photoURL', 'token'])
      .then((valArr) => {
        self.setState({
          email: valArr[1][1],
          firstName: valArr[2][1],
          lastName: valArr[3][1],
          photoURL: valArr[4][1],
        });
        var token = valArr[5][1];
        // API
        API.getChallenges(token)
          .then(function(challenges){
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
      email: '',
      firstName: '',
      lastName: '',
      photoURL: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        {this.profileInfo()}
        {this.userChallenges()}
      </View>
    );
  },

  profileInfo: function(){
    // Needs to be configured
    var image = `../../..${this.state.photoURL}`;
    var fName = _.capitalize(this.state.firstName);
    var lName = _.capitalize(this.state.lastName);

    return ( 
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          
        </View>
        <View style={styles.headerMiddle}>
          <Image 
            style={styles.photo}
            source={require('../../../image/placeholder.png')} />
          <Text style={styles.profileText}>{fName} {lName}</Text>
        </View>
        <View style={styles.headerRight}>
          
        </View>
      </View>
    )
  },

  userChallenges: function(){
    return (      
      <ListView
        renderSeparator={this._renderSeparator}
        automaticallyAdjustContentInsets={false}
        style={styles.footer}
        dataSource={this.state.dataSource}
        renderFooter={this._renderFooter}
        renderRow={this._renderRow}
      />
    )
  },

  _renderRow: function(rowData){
    return (
      <TouchableHighlight 
        onPress={() => this._showDetailView(rowData)}
        key={rowData.id}
        underlayColor='transparent'
        style={styles.row}>
        <View style={styles.rowContainer}>
          <View style={styles.leftRow}>
            <Image 
              style={styles.rowPhoto}
              source={require('../../../image/placeholder.png')} />
          </View>
          <View style={styles.rightRow}>
            <View style={styles.rowData}>
              <Text style={styles.rowDataTitle}>{rowData.title}</Text>
              <Text style={styles.rowDataDescription}>{rowData.description}</Text>
            </View>
            <View style={styles.rowSocial}>
              <Text style={styles.rowSocialText}>{rowData.charityAmount}</Text>
              <Text style={styles.rowSocialText}>{rowData.likes}</Text>
              <Text style={styles.rowSocialText}>{rowData.issuedDate}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  },

  _showDetailView: function(challenge){
    this.props.navigator.push({
      title: challenge.title,
      component: DetailChallenge,
      passProps: {challenge: challenge}
    });
  },

  _renderSeparator: function(){
    return <View style={styles.separator}/>
  },

  _renderFooter: function(){
    if (this.state.isLoading === true) {
      return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
    }
  },

  getDataSource: function(challenges: Array<any>): ListView.DataSource{
    return this.state.dataSource.cloneWithRows(challenges);
  }

});

var styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
  },

  // Utility
  scrollSpinner: {
    marginVertical: 20,
  },

  // Header
  header: {
    flex: 1,
    marginTop: 60,
    padding: 10,
    backgroundColor: 'EEAF4B',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerLeft: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 30,
    backgroundColor: 'white',
  },
  headerMiddle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 30,
    backgroundColor: 'white',
  },
  photo: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  profileText: {
    color: 'white',
    fontSize: 24,
    marginTop: 10,
  },

  // Footer/List View
  footer: {
    padding: 10,
    flex: 2,
    marginBottom: 50,
  },
  row: {
    marginBottom: 5,
    marginTop: 5,
  },
  separator: {
    backgroundColor: 'rgba(216, 216, 216, 1)',
    height: 1,
    marginLeft: 80,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  rowPhoto: {
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  // title & description
  rowData: {

  },
  rowDataTitle: {
    color: '#546979',
    fontSize: 18,
  },
  rowDataDescription: {
    color: '#546979',
    fontSize: 16,
  },
  // likes, time, charity amount
  rowSocial:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowSocialText:{
    color: '#546979',
    fontSize: 14,
  },
  leftRow: {
    flex: 1,
    alignSelf: 'center',
  },
  rightRow: {
    flex: 4,
    alignSelf: 'center',
  }
});

module.exports = Profile;