/* @flow */
'use strict';

var React = require('react-native');
var { Icon } = require('react-native-icons');
var _ = require('lodash');

var TableView = require('react-native-tableview');
var Section = TableView.Section;
var Item = TableView.Item;

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

    var name = this.props.user.firstName + ' ' + this.props.user.lastName;
    var email = this.props.user.email;

    return (
      <View style={styles.container}>

        <View style={styles.header}>

          <View style={styles.tableView}>
            <View style={styles.tableViewHeader}>
              <Text style={styles.sectionText}>{('Profile Information').toUpperCase()}</Text>
            </View>
            <TouchableHighlight
              onPress={() => this.changeName()}
              underlayColor='transparent'>

              <View style={styles.cell}>
                <Text style={styles.textParagraph}>{name}</Text>
                <Icon
                  name='material|chevron-right'
                  size={20}
                  style={styles.icon} />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.selectTransaction()}
              underlayColor='transparent'>

              <View style={styles.cell}>
                <Text>{email}</Text>
                <Icon
                  name='material|chevron-right'
                  size={20}
                  style={styles.icon} />
              </View>
            </TouchableHighlight>
          </View>
          
        </View>

        <View style={styles.main}>
          <ListView
            ref='listview'
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderHeader={this._renderHeader}
            renderRow={this._renderRow}
            renderSeparator={this._renderSeparator}
            renderFooter={this._renderFooter}
            style={styles.tableView}
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
  _renderHeader: function(){
    return (
      <Text style={styles.sectionText}>{('Billing Information').toUpperCase()}</Text>
    );
  },

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
    
  },

  // TableView
  tableView: {
    backgroundColor: '#F0F0F2',
    // flex: 1,
    paddingTop: 30,
    paddingBottom: 15,
  },
  cell: {
    backgroundColor: 'white',
    borderBottomColor: 'C8C7CC',
    borderBottomWidth: 1, 
    // flex: 1,
    height: 40,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',

  },

  sectionText: {
    paddingLeft: 15,
    paddingBottom: 5,
  },


  // Main Content
  main: {
    flex: 1, 
    backgroundColor: 'blue',
  },
  // Row
  row: {
    height: 60,
    paddingLeft: 15,
    paddingRight: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
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
    backgroundColor: 'rgba(216, 216, 216, 1)',
    height: 1,
    marginLeft: 80,
  },

  footer: {
    marginBottom: 50,
    backgroundColor: '#F0F0F2',
  },

  iconText: {
    flexDirection: 'row',
  },

  // icon
  icon: {
    width: 15,
    height: 15,
  },

  // Text
  textParagraph: {
    fontSize: 16,
  },

});

module.exports = Settings;