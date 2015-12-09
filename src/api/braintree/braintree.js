var API = require('../api');

// Routes
var transactionsURL = `${API.rootUrl}braintree/transactions/`;

var BraintreeAPI = {

  getTransactions: function(){
    return API.fetchJSON(transactionsURL)      
      .then(function(json){
        return json;
      });
  }

}

module.exports = BraintreeAPI;