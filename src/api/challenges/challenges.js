var API = require('../api');

// Routes
var userChallengesURL = `${API.rootUrl}challenge/my/`;
var challengesURL = `${API.rootUrl}challenge/`;

var ChallengeAPI = {

  getUserChallenges: function(token) {
    return API.fetchJSON(userChallengesURL, token)
      .then(function(json) {
        return json;
      })
      .catch(function(err) {
        console.log('error retrieving challenges for specific user : ', err);
      });
  },

  getAllChallenges: function(token) {
    return API.fetchJSON(challengesURL, token)
      .then(function(json) {
        return json;
      })
      .catch(function(err) {
        console.log('error retrieving all challenges : ', err);
      });
  },

  updateChallenge: function(token, obj) {
    var challengeObj = JSON.stringify(obj);

    return API.postJSON(challengesURL, 'PUT', challengeObj, token)
      .then(function(json) {
        return json;
      })
      .catch(function(err) {
        console.log('error increasing like : ', err);
      });
  },

};

module.exports = ChallengeAPI;
