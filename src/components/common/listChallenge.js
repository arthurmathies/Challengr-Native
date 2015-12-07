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

var API = require('../../api/challenges/challenges');

var ListChallenge = React.createClass({

  render: function() {

    var issue = Moment(this.props.rowData.issuedDate);
    var expire = Moment(this.props.rowData.expiresDate);

    var title = _.trunc(this.props.rowData.title, 40);
    var description = _.trunc(this.props.rowData.description, 40);

    return (
      <TouchableHighlight 
        onPress={() => this.props.showDetailView(this.props.rowData)}
        key={this.props.rowData.id}
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

              <View style={styles.iconText}>
                <Icon
                name='material|time'
                size={15}
                style={styles.icon} />
                <Text style={styles.rowSocialText}>{expire.fromNow()}</Text>
              </View>

              <View style={styles.iconText}>
                <Icon
                  name='material|money'
                  size={15}
                  style={styles.icon} />
                <Text style={styles.rowSocialText}>{this.props.rowData.charityAmount * 100}</Text>
              </View>

              <TouchableHighlight
                onPress={() => this.increaseLike(this.props.rowData)}
                underlayColor='transparent'>
                <View style={styles.iconText}>
                  {this.renderHeartIcon()}
                  <Text style={styles.rowSocialText}>{this.props.rowData.likes} likes</Text>
                </View>
              </TouchableHighlight>

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
      likes: ++challenge.likes,
      completed: challenge.completed,
      notCompleted: challenge.notCompleted,
    };

    API.updateChallenge(this.props.token, updateObj)

  },

});

// Validation
ListChallenge.propTypes = {
  rowData: React.PropTypes.object.isRequired,
  showDetailView: React.PropTypes.func.isRequired,
  token: React.PropTypes.string.isRequired,
}

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