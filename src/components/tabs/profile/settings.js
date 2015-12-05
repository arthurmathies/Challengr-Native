/* @flow */
'use strict';

var React = require('react-native');
var { Icon } = require('react-native-icons');

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

var Button = require('../../common/button');
var API = require('../../../api/braintree/braintree');
var Moment = require('moment');

var Settings = React.createClass({

  componentDidMount: function(){
    var self = this;
    // Loader
    self.state.isLoading = true;
    // Async Storage
    AsyncStorage.getItem('token')
      .then((token) => {
        // API
        API.getTransactions(token)
          .then(function(data){
            console.log('transactions : ', data.transactions);
            // Loader
            self.state.isLoading = false;
            // State
            self.setState({
              dataSource: self.getDataSource(data.transactions),
            })
          })

      })
      .done();
  },

  getInitialState: function(){
    return {
      isLoading: false,
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
    }
  },

  render: function() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text>{this.props.user.firstName} {this.props.user.lastName}</Text>
          <Text>{this.props.user.email}</Text>
        </View>

        <View style={styles.main}>
          <ListView
            ref="listview"
            automaticallyAdjustContentInsets={true}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderSeparator={this._renderSeparator}
            renderFooter={this._renderFooter}
          />
        </View>

        <View style={styles.footer}>
          <Button
            text={'Sign Out'}
            onPress={this._signout}/>
        </View>

      </View> 
    );
  },

  _signout: function(){
    // clear the async storage and go to the sign in view
    this.props.navigator.popToTop();
  },

  // List View
  _renderRow: function(transaction){

    var createdAt = Moment(transaction.created)

    return (
      <TouchableHighlight
        key={transaction.id}
        onPress={() => this.selectTransaction(transaction)}
        underlayColor='transparent'>
        <View style={styles.row}>
          <View style={styles.leftRow}>
            <Image 
              style={styles.rowPhoto}
              source={{uri: transaction.imgUrl}} />
          </View>
          <View style={styles.rightRow}>
            <Text style={styles.paddingRight}>{transaction.last4}</Text>
            <View style={styles.iconText}>
              <Icon
                name='material|money'
                size={15}
                style={styles.icon} />
              <Text>{transaction.amount}</Text>
            </View>
            <Text style={styles.dateText}>{createdAt.format("MMM Do, YYYY")}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  },

  selectTransaction: function(transaction){

  },

  _renderSeparator: function(){
    return <View style={styles.rowSeparator}/>
  },

  _renderFooter: function(){
    if (this.state.isLoading === true) {
      return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
    }
  },

  getDataSource: function(transactions: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(transactions);
  },

});

// Validation
Settings.propTypes = {
  user: React.PropTypes.object.isRequired
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },

  // Utility
  scrollSpinner: {
    marginVertical: 20,
  },
  paddingRight: {
    paddingRight: 10,
  },

  // Header
  header: {
    padding: 10,
  },

  // Main Content
  main: {
    flex: 1,
  },
  // Row
  row: {
    marginBottom: 5,
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },

  leftRow: {
    paddingRight: 15,
    alignSelf: 'center',
  },
  rowPhoto: {
    borderRadius: 0,
    width: 56,
    height: 38,
  },

  rightRow: {
    alignSelf: 'center',
    flexDirection: 'row',
  },

  rowSeparator: {
    backgroundColor: 'rgba(216, 216, 216, 0.5)',
    height: 1,
    marginLeft: 80,
  },

  footer: {
    marginBottom: 50,
  },

  iconText: {
    flexDirection: 'row',
  },

  // icon
  icon: {
    width: 15,
    height: 15,
  }

});

module.exports = Settings;