'use strict';

var React = require('react-native');
var _ = require('lodash');
var { Icon } = require('react-native-icons');

var {
  StyleSheet,
  View,
  ListView,
  ActivityIndicatorIOS,
  SegmentedControlIOS,
} = React;

var API = require('../../../api/challenges/challenges');
var DetailChallenge = require('../../common/challengeViews/detailChallenge');
var ListChallenge = require('../../common/challengeViews/listChallenge');


var Profile = React.createClass({

  propTypes: {
    navigator: React.PropTypes.object.isRequired,
  },

  componentDidMount: function(){
    // Loader
    this.setState({
      isLoading: true
    });
    // API
    var poll = function(){
      API.getMyChallenges()
        .then((myChallenges) => {
          this.setState({
            // Loader
            isLoading: false,
            myChallenges: this.getMyChallenges(myChallenges),
          });
        })
        .done();

      API.getImposedChallenges()
        .then((imposedChallenges) => {
          this.setState({
          imposedChallenges: this.getImposedChallenges(imposedChallenges),
          });
        })
        .done();  
    }.bind(this);
    // start polling
    poll();
    this.setState({
      interval: setInterval(poll, 10000),
    });

  },

  getInitialState: function(){
    return {
      isLoading: false,
      myChallenges: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      imposedChallenges: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      segment: 'My Challenges',
      interval: null,
    };
  },

  render: function() {
    return (
      <View
        style={styles.footer}>
        <SegmentedControlIOS
          tintColor='rgba(218, 218, 218, 1)'
          values={['My Challenges', 'Imposed Challenges']}
          selectedIndex={0}
          onValueChange={this._changeSegment} />
          {this._renderSegment()}
      </View>
    );
  },

  _changeSegment: function(segment){
    this.setState({
      segment: segment,
    });
  },

  _renderSegment: function() {
    if(this.state.segment === 'My Challenges'){
      return (
        <ListView
          ref="listview"
          renderSeparator={this._renderSeparator}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.myChallenges}
          renderFooter={this._renderFooter}
          renderRow={this._renderRow} />
          );
    }else{
      return (
        <ListView
          ref="listview"
          renderSeparator={this._renderSeparator}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.imposedChallenges}
          renderFooter={this._renderFooter}
          renderRow={this._renderRow} />
        );
    }
  },

  _renderRow: function(rowData){
    return <ListChallenge 
              rowData={rowData}
              showDetailView={this._showDetailView}/>
  },

  _showDetailView: function(challenge){
    this.props.navigator.push({
      title: challenge.title,
      component: DetailChallenge,
      passProps: {
        challenge: challenge,
      },
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

  getMyChallenges: function(myChallenges){
    return this.state.myChallenges.cloneWithRows(myChallenges);
  },

  getImposedChallenges: function(imposedChallenges){
    return this.state.imposedChallenges.cloneWithRows(imposedChallenges);
  },

});

var styles = StyleSheet.create({
  // Utility
  scrollSpinner: {
    marginVertical: 20,
  },

  // Footer/List View
  footer: {
    flex: 2,
    marginBottom: 50,
  },
  separator: {
    backgroundColor: 'rgba(216, 216, 216, 1)',
    height: 1,
    marginLeft: 80,
  },
  segmentedControl: {
    marginTop: 10,
  },
});

module.exports = Profile;