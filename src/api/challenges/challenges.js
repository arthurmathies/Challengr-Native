var API = require('../api');

// Routes
var myChallengesURL = `${API.rootUrl}challenge/my/`;
var challengesURL = `${API.rootUrl}challenge/`;
var imposedChallengesURL = `${API.rootUrl}challenge/imposed/`;

var ChallengeAPI = {

  getMyChallenges: function() {
    return API.fetchJSON(myChallengesURL)
      .then(function(json) {
        return json;
      })
      .catch(function(err) {
        console.log('error retrieving my challenges for specific user : ', err);
      });
  },

  getImposedChallenges: function() {
    return API.fetchJSON(imposedChallengesURL)
      .then(function(json) {
        return json;
      })
      .catch(function(err) {
        console.log('error retrieving imposed challenges for specific user : ', err);
      });
  },

  getAllChallenges: function() {
    return API.fetchJSON(challengesURL)
      .then(function(json) {
        return json;
      })
      .catch(function(err) {
        console.log('error retrieving all challenges : ', err);
      });
  },

  updateChallenge: function(obj) {
    var challengeObj = JSON.stringify(obj);

    return API.postJSON(challengesURL, 'PUT', challengeObj)
      .then(function(json) {
        return json;
      })
      .catch(function(err) {
        console.log('error increasing like : ', err);
      });
  },

};

module.exports = ChallengeAPI;
