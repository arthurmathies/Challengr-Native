/* @flow */
'use strict';

var React = require('react-native');
var { Icon } = require('react-native-icons');
var _ = require('lodash');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} = React;

var Settings = require('./settings');

var ProfileInfo = React.createClass({

  propTypes: {
    email: React.PropTypes.string.isRequired,
    firstName: React.PropTypes.string.isRequired,
    lastName: React.PropTypes.string.isRequired,
    photoURL: React.PropTypes.string.isRequired,
    navigator: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      photoURL: this.props.photoURL,
    };
  },

  render: function() {
    return (
      <View style={styles.header}>      
        <TouchableHighlight
          style={styles.headerLeft}
          onPress={this._userSettings}
          underlayColor={'transparent'}>
          <Icon
            name='material|settings'
            size={30}
            color='#333333'
            style={{width: 30, height: 30}}
          />
        </TouchableHighlight> 
        <View style={styles.headerMiddle}>
          <TouchableHighlight
          onPress={this._changePhoto}
          underlayColor={'transparent'}>
            <View>
              <Image 
                style={styles.photo}
                source={{uri: this.props.photoURL}} />
            </View>
          </TouchableHighlight>
          <Text style={styles.profileText}>{_.capitalize(this.props.firstName)} {_.capitalize(this.props.lastName)}</Text>
        </View>
        <TouchableHighlight 
          style={styles.headerRight}
          onPress={this._changePhoto}
          underlayColor={'transparent'}>
          <Icon
            name='material|plus'
            size={30}
            color='#333333'
            style={{width: 30, height: 30}}
          />
        </TouchableHighlight>
      </View>
    );
  },

  _userSettings: function(){
    var userObj = {
      email: this.props.email,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      photoURL: this.props.photoURL,
    };
    // go to user settings view
    this.props.navigator.push({
      title: 'Settings',
      component: Settings,
      passProps: {user: userObj}
    });
  },

  _changePhoto: function(){
    // access the camera to change profile image
    var options = {
      title: 'Select Profile Image',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...',
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      customButtons: {
        'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
      },
      quality: 1,
      allowsEditing: false, // Built in iOS functionality to resize/reposition the image
      noData: false, // Disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
      }
    };

    UIImagePickerManager.showImagePicker(options, (didCancel, response) => {
      console.log('Response = ', response);
      if (didCancel) {
        
      }
      else {
        if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          // You can display the image using either:
          const source = 'data:image/jpeg;base64,' + response.data;
          // const source = {uri: response.uri.replace('file://', ''), isStatic: true};

          // Upload and change the user's profile image

          this.setState({
            photoURL: source
          });
        }
      }
    });
  },

});


var styles = StyleSheet.create({

  // Header
  header: {
    flex: 1,
    padding: 10,
    backgroundColor: '#47A0DB',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 2,
    marginTop: 60,
  },
  headerLeft: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
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

});

module.exports = ProfileInfo;