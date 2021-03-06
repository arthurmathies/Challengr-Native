/* @flow */
'use strict';

var React = require('react-native');
var { Icon } = require('react-native-icons');
var _ = require('lodash');
var Moment = require('moment');

var {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Text,
} = React;

var API = require('../../../api/challenges/challenges');
var Like = require('../challengeDetailIcons/like');
var Money = require('../challengeDetailIcons/money');
var Time = require('../challengeDetailIcons/time');

var ListChallenge = React.createClass({
  
  // Validation
  propTypes: {
    rowData: React.PropTypes.object.isRequired,
    showDetailView: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      likes: this.props.rowData.likes,
    };
  },

  render: function() {

    var title = _.trunc(this.props.rowData.title, 40);
    var description = _.trunc(this.props.rowData.description, 40);

    return (
      <TouchableHighlight 
        onPress={() => this.props.showDetailView(this.props.rowData)}
        // key={this.props.rowData.id}
        underlayColor='transparent'
        style={styles.row}>
        <View style={styles.rowContainer}>

          <View style={styles.leftRow}>
            <Image 
            style={styles.rowPhoto}
            source={{uri: this.props.rowData.Challenged.photoURL}} />
          </View>

          <View style={styles.rightRow}>
            <View style={styles.rowData}>
              <Text style={styles.rowDataTitle}>{_.capitalize(title)}</Text>
              <Text style={styles.rowDataDescription}>{description}</Text>
            </View>

            <View style={styles.rowSocial}>

              <Time
                id={this.props.rowData.id}
                issuedDate={this.props.rowData.issuedDate}
                expiresDate={this.props.rowData.expiresDate} />

              <Money
                id={this.props.rowData.id}
                charityAmount={this.props.rowData.charityAmount} />

              <Like
                id={this.props.rowData.id}
                likes={this.props.rowData.likes} />

            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  renderHeartIcon: function(){
    if (this.props.rowData.likes > 0) {
      return (<Icon
      name='material|favorite'
      size={15}
      color={'red'}
      style={styles.icon} />);
    } else {
      return (<Icon
      name='material|favorite-outline'
      size={15}
      style={styles.icon} />);
    }
  },

  increaseLike: function(challenge){
    var updateObj = {
      id: challenge.id,
      likes: this.state.likes + 1, 
    };

    API.updateChallenge(updateObj)
    .then(function(resp) {
      if(resp.success === true) {
        this.setState({
          likes: this.state.likes + 1,
        });
      }
    }.bind(this))
    .done();
  },

});

var styles = StyleSheet.create({
  row: {
    marginBottom: 10,
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowPhoto: {
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  // title & description
  rowData: {
    paddingBottom: 10,
  },
  rowDataTitle: {
    color: '#38454F',
    fontSize: 18,
    paddingBottom: 3,
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
  iconText: {
    flexDirection: 'row',
  },
  rowSocialText:{
    color: '#546979',
    fontSize: 14,
    paddingLeft: 3,
  },
  leftRow: {
    flex: 1,
    alignSelf: 'center',
  },
  rightRow: {
    flex: 4,
    alignSelf: 'center',
  },

  // icon
  icon: {
    width: 15,
    height: 15,
  },

});


module.exports = ListChallenge;