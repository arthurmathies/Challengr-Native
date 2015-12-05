var API = require('../api');

// Routes
var signinURL = `${API.rootUrl}auth/signin`;
var signupURL = `${API.rootUrl}auth/signup`;

var AuthAPI = {

  signin: function(email, password){

    var userObj = JSON.stringify({
        email: email,
        password: password,
      });
    
    return API.postJSON(signinURL, 'POST', userObj)      
      .then(function(json){
        return json;
      })
      .catch((err) => console.log('ERROR : ', err));

  },

  createAccount: function(firstName, lastName, email, password){

    var userObj = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
    
    return API.postJSON(signupURL, 'POST', userObj)      
      .then(function(json){
        return json;
      })
      .catch((err) => console.log('ERROR : ', err));

  }

}

module.exports = AuthAPI;