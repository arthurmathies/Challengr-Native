var API = require('../api');

// Routes
var userFriendsURL = `${API.rootUrl}user`;

var UserAPI = {

  getFriends: function(token){
    return API.fetchJSON(userFriendsURL, token)      
      .then(function(json){
        return json;
      });
  }

}

module.exports = UserAPI;