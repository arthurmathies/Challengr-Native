var API = require('../api');

// Routes
var userFriendsURL = `${API.rootUrl}user/`;

var UserAPI = {

  getFriends: function(){
    return API.fetchJSON(userFriendsURL)      
      .then(function(json){
        return json;
      });
  }

}

module.exports = UserAPI;