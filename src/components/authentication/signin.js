var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var { Icon } = require('react-native-icons');

var {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  Image,
} = React;

var Button = require('../common/button');
var Link = require('../common/link');
var API = require('../../api/auth/auth.js');

module.exports = React.createClass({  

  getInitialState: function(){
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },

  render: function(){
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Image 
            style={styles.backgroundImage}
            source={{uri: 'https://s3-us-west-2.amazonaws.com/challengrimages/placeholder/Motivational-Gym-Quote-with-mobile-wallpaper.jpg'}}>

          </Image>
        </View>

        <View style={styles.footer}>
          <Text>{this.state.errorMessage}</Text>

          <View style={styles.iconContainer}>
            <Icon name='material|account-o' size={30} color='#333333' style={styles.icon} />
            <TextInput 
              value={this.state.email}
              placeholder={'Email Address'}
              onChangeText={(text) => this.setState({email: text})}
              style={styles.textInput} />
          </View>
          <View style={styles.lineSeparator} />

          <View style={styles.iconContainer}>
            <Icon name='material|lock-outline' size={30} color='#333333' style={styles.icon} />
            <TextInput 
              value={this.state.password}
              placeholder={'Password'}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password: text})}
              style={styles.textInput} />
          </View>
          <View style={styles.lineSeparator} />

          <Button
            text={'Sign In'}
            onPress={this.signIn}/>

          <Link
            text={'Don\'t have an account? Sign Up'}
            onPress={this.createAccount}/>  
            
        </View>

      </View>
    )
  },

  createAccount: function(){
    // navigate to signup page
    this.props.navigator.push({name: 'createAccount'})
  },

  signIn: function(){

    var self = this;

    // Validation
    if (self.state.email !== '' && self.state.password !== '') {

      // API 
      API.signin(self.state.email, self.state.password)
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
          } else{
            // Clear State & Show Error
            self.setState({
              email: '',
              password: '',
              errorMessage: data.message
            });
          }

        })

    } else {
      self.setState({
        errorMessage: 'Please fill in an email and password'
      });
    }
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Header
  header: {
    flex: 1,
  },

  // Footer
  footer: {
    flex: 1,
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

  backgroundImage: {
    flex: 1,
    width: width,
    resizeMode: Image.resizeMode.cover,
  },


});