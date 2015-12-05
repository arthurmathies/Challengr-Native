var API = require('../api');

// Routes
var transactionsURL = `${API.rootUrl}braintree/transactions`;

var BraintreeAPI = {

  getTransactions: function(token){
    return API.fetchJSON(transactionsURL, token)      
      .then(function(json){
        return json;
      });
  }

}

module.exports = BraintreeAPI;