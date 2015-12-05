var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var { Icon } = require('react-native-icons');

var {
  Text,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
} = React;

var Button = require('../common/button');
var Link = require('../common/link');
var API = require('../../api/auth/auth.js');

module.exports = React.createClass({

  getInitialState: function(){
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errorMessage: '',
    }
  },

  render: function() {
    return (
      <View style={styles.container}>

        <View style={styles.footer}>
          <Text>{this.state.errorMessage}</Text>

          <View style={styles.iconContainer}>
            <Icon
              name='material|account-o'
              size={30}
              color='#333333'
              style={styles.icon} />
            <TextInput 
              value={this.state.firstName}
              placeholder={'First Name'}
              onChangeText={(text) => this.setState({firstName: text})}
              style={styles.textInput} />
          </View>
          <View style={styles.lineSeparator} />

          <View style={styles.iconContainer}>
            <Icon
              name='material|account-o'
              size={30}
              color='#333333'
              style={styles.icon} />
            <TextInput 
              value={this.state.lastName}
              placeholder={'Last Name'}
              onChangeText={(text) => this.setState({lastName: text})}
              style={styles.textInput} />
          </View>
          <View style={styles.lineSeparator} />

          <View style={styles.iconContainer}>
            <Icon
              name='material|account-o'
              size={30}
              color='#333333'
              style={styles.icon} />
            <TextInput 
              value={this.state.email}
              placeholder={'Email Address'}
              onChangeText={(text) => this.setState({email: text})}
              style={styles.textInput} />
          </View>
          <View style={styles.lineSeparator} />

          <View style={styles.iconContainer}>
            <Icon
              name='material|lock-outline'
              size={30}
              color='#333333'
              style={styles.icon} />
            <TextInput 
              value={this.state.password}
              placeholder={'Password'}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password: text})}
              style={styles.textInput} />
          </View>
          <View style={styles.lineSeparator} />

          <Button
            text={'Create Account'}
            onPress={this.createAccount} />  

          <Link
            style={styles.link}
            text={'Already have an account? Sign In'}
            onPress={this.signIn} />  
        </View>

      </View>
    );
  },

  createAccount: function(){
    var self = this;

    // Validation
    if (self.state.firstName !== '' && self.state.lastName !== '' && self.state.email !== '' &&self.state.password !== '') {

      API.createAccount(self.state.firstName, self.state.lastName, self.state.email, self.state.password)
        .then(function(data){
          if (data.success === true) {
            // AsyncStorage
            AsyncStorage.setItem('id', data.user.id.toString());
            AsyncStorage.setItem('email', data.user.email);
            AsyncStorage.setItem('firstName', data.user.firstName);
            AsyncStorage.setItem('lastName', data.user.lastName);
            AsyncStorage.setItem('photoURL', data.user.photoURL);
            AsyncStorage.setItem('token', data.token);
            // Navigation
            self.props.navigator.immediatelyResetRouteStack([{ name: 'tabs' }])
          } else {
            // Clear State & Show Error
            self.setState({
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              errorMessage: data.message
            });
          }

        })

    } else {
      self.setState({
        errorMessage: 'Please fill out all information to create an account'
      });
    }
    
  },

  signIn: function(){
    this.props.navigator.pop();
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Footer
  footer: {
    alignItems: 'center',
  },

  // Icon
  iconContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    // backgroundColor: 'green',
    width: width * 8/10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  icon: {
    width: 30,
    height: 30,
    // backgroundColor: 'red',
    alignSelf: 'center',
  },

  lineSeparator: {
    height: 1,
    backgroundColor: 'black',
    width: width,
  },

  textInput: {
    paddingLeft: 10,
    height: 50,
    flex: 1,
    // backgroundColor: 'red',
  },

});