'use strict';

var React = require('react-native');
var _ = require('lodash');
var { Icon } = require('react-native-icons');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

var {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  Image,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;

var API = require('../../../api/challenges/challenges');
var DetailChallenge = require('../../common/detailChallenge');
var ListChallenge = require('../../common/listChallenge');
var Settings = require('./settings');

var Profile = React.createClass({

  componentDidMount: function(){
    var self = this;
    // Loader
    self.state.isLoading = true;
    // Async Storage
    AsyncStorage.multiGet(['id', 'email', 'firstName', 'lastName', 'photoURL', 'token'])
      .then((valArr) => {
        self.setState({
          email: valArr[1][1],
          firstName: valArr[2][1],
          lastName: valArr[3][1],
          photoURL: valArr[4][1],
          token: valArr[5][1],
        });
        var token = valArr[5][1];
        // API
        API.getChallenges(token)
          .then(function(challenges){
            // Loader
            self.state.isLoading = false;
            // State
            self.setState({
              dataSource: self.getDataSource(challenges),
            })
          })

      })
      .done();
  },

  getInitialState: function(){
    return {
      isLoading: false,
      token: '',
      email: '',
      firstName: '',
      lastName: '',
      photoURL: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        {this.profileInfo()}
        {this.userChallenges()}
      </View>
    );
  },

  profileInfo: function(){

    var fName = _.capitalize(this.state.firstName);
    var lName = _.capitalize(this.state.lastName);

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
          <Image 
            style={styles.photo}
            source={{uri: this.state.photoURL}} />
          <Text style={styles.profileText}>{fName} {lName}</Text>
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
    )
  },

  _userSettings: function(){
    var userObj = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      photoURL: this.state.photoURL,
    }
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

  userChallenges: function(){
    return (      
      <ListView
        ref="listview"
        style={styles.footer}
        renderSeparator={this._renderSeparator}
        automaticallyAdjustContentInsets={false}
        dataSource={this.state.dataSource}
        renderFooter={this._renderFooter}
        renderRow={this._renderRow}
      />
    );
  },

  _renderRow: function(rowData){
    return <ListChallenge 
              rowData={rowData}
              showDetailView={this._showDetailView}
              token={this.state.token} />
  },

  _showDetailView: function(challenge){
    this.props.navigator.push({
      title: challenge.title,
      component: DetailChallenge,
      passProps: {challenge: challenge}
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

  getDataSource: function(challenges: Array<any>): ListView.DataSource{
    return this.state.dataSource.cloneWithRows(challenges);
  }

});

var styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
  },

  // Utility
  scrollSpinner: {
    marginVertical: 20,
  },

  // Header
  header: {
    flex: 1,
    padding: 10,
    backgroundColor: 'EEAF4B',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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

  // Footer/List View
  footer: {
    flex: 2,
    marginBottom: 50,
  },
  separator: {
    backgroundColor: 'rgba(216, 216, 216, 1)',
    height: 1,
    marginLeft: 80,
  }
});

module.exports = Profile;