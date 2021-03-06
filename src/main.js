var React = require('react-native');

var {
  StyleSheet,
  Navigator,
} = React;

var Signin = require('./components/authentication/signin');
var CreateAccount = require('./components/authentication/signup');
var Tabs = require('./components/tabs/tabs');

var ROUTES = {
  signin: Signin,
  createAccount: CreateAccount,
  tabs: Tabs,
}

module.exports = React.createClass({

  renderScene: function(route, navigator){
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator}/>;
  },

  render: function(){
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'signin'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
        />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});