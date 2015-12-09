var API = require('../api');

// Routes
var charityURL = `${API.rootUrl}charity/`;

var CharityAPI = {

  getCharities: function(){
    return API.fetchJSON(charityURL)      
      .then(function(json){
        return json;
      })
      .catch((err) => {
        console.log('ERROR : ', err)
      });
  }

}

module.exports = CharityAPI;