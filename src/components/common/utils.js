/*

=== Styles Guide ===

* TabBar *
marginBottom: 50

* NavBar *
marginTop: 60

* Row Direction *
rowDirection: 'column'
- justifyContent: 'vertical'
- alignItems: 'horizontal'

=== Helpers ===

* Dimensions *
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

* Lodash *
var _ = require('lodash');

* Icons *
<Icon name='material|money' size={15} style={styles.icon} />

* Touchable Highlight *
<TouchableHighlight 
  onPress={() => this._doSomething(data)}
  underlayColor='transparent'>

* List View *
<ListView
  ref='listview'
  automaticallyAdjustContentInsets={true}
  dataSource={this.state.dataSource}
  renderRow={this._renderRow}
  renderSeparator={this._renderSeparator}
  renderFooter={this._renderFooter} />

=== Project Specific Common Utils ===

*/

/* === Starting Template === */
/* @flow */
'use strict';

var React = require('react-native');
var _ = require('lodash');
var { Icon } = require('react-native-icons');

var {
  StyleSheet,
  View,
  AsyncStorage,
  Text,
  TouchableHighlight,
  ListView,
  ActivityIndicatorIOS,
} = React;

var API = require('');
var Link = require('');

var Component = React.createClass({

  componentDidMount: function(){
    var self = this;
    self.setState({ isLoading: true });
    AsyncStorage.getItem('token')
      .then((token) => {
        API.apiMethod(token)
          .then(function(data){
            console.log('data : ', data);
            self.setState({
              isLoading: false
            });
          });
      }).done();
  },

  getInitialState: function(){
    return {
      isLoading: false,
    }
  },

  render: function() {
    return (
      <View style={[styles.container, this._renderBorder('purple')]}>

        <View style={[styles.header, this._renderBorder('red')]}>
          <Text>Header</Text>
        </View>

        <View style={[styles.main, this._renderBorder('green')]}>
          <Text>Main</Text>
        </View>

        <View style={[styles.footer, this._renderBorder('blue')]}>
          <Text>Footer</Text>
        </View>

      </View>
    );
  },

  // Navigation

  _showDetailView: function(){
    // this.props.navigator.push({
    //   title: 'title',
    //   component: component,
    //   passProps: {data: data}
    // });
  },

  // Utils

  _renderLoader: function(){
    if (this.state.isLoading === true) {
      return <ActivityIndicatorIOS style={styles.spinner} />;
    }
  },

  _renderBorder: function(color){
    return {
      borderWidth: 1,
      borderColor: color
    };
  }

});

// Validation
Component.propTypes = {
  // user: React.PropTypes.object.isRequired
};

var styles = StyleSheet.create({

  // Layout
  container: {
    flex: 1,
  },
    // Header
    header: {
      flex: 1,
    },

    // Main
    main: {
      flex: 2,
    },

    // Footer
    footer: {
      flex: 1,
    },

  // Utils
  icon: {
    height: 15,
    width: 15,
    color: 'blue'
  },
  spinner: {
    marginVertical: 20,
  },
  rowSeparator: {
    backgroundColor: 'rgba(216, 216, 216, 1)',
    height: 1,
    marginLeft: 80,
  },

});


module.exports = Component;
