module.exports = {

  rootUrl: 'http://localhost:3000/api/',

  fetchJSON: function(url, token){
    return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token,
          'Allow-Control-Allow-Origin': '*'
        }
      })
      .then((response) => response.json())
  },

  postJSON: function(url, method, body, token){
    console.log('body : ', body);
    return fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token,
          'Allow-Control-Allow-Origin': '*'
        },
        body: body
      })
      .then((response) => response.json())
  }

};