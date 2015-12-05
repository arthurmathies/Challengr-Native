var API = require('../api');

// Routes
var charityURL = `${API.rootUrl}charity`;

var CharityAPI = {

  getCharities: function(token){
    return API.fetchJSON(charityURL, token)      
      .then(function(json){
        return json;
      })
      .catch((err) => {
        console.log('ERROR : ', err)
      });
  }

}

module.exports = CharityAPI;