var API = require('../api');

// Routes
var myChallengesURL = `${API.rootUrl}challenge/my/`;
var challengesURL = `${API.rootUrl}challenge/`;
var imposedChallengesURL = `${API.rootUrl}challenge/imposed/`;

var ChallengeAPI = {

  getMyChallenges: function(token) {
    return API.fetchJSON(myChallengesURL, token)
      .then(function(json) {
        return json;
      })
      .catch(function(err) {
        console.log('error retrieving my challenges for specific user : ', err);
      });
  },

  getImposedChallenges: function(token) {
    return API.fetchJSON(imposedChallengesURL, token)
      .then(function(json) {
        return json;
      })
      .catch(function(err) {
        console.log('error retrieving imposed challenges for specific user : ', err);
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
