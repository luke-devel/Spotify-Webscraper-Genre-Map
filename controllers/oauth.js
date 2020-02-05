// // FROM HTML

// <div id="login">
//   <h1>This is an example of the Authorization Code flow</h1>
//   <a href="/login" class="btn btn-primary">Log in with Spotify</a>
// </div>
// <div id="loggedin">
//   <div id="user-profile">
//   </div>
//   <div id="oauth">
//   </div>
//   <button class="btn btn-default" id="obtain-new-token">Obtain new token using the refresh token</button>
// </div>



// //FROM HTML SCRIPT TAGS

// <script id="user-profile-template" type="text/x-handlebars-template">
//   <h1>Logged in as {{display_name}}</h1>
//   <div class="media">
//     <div class="pull-left">
//       <img class="media-object" width="150" src="{{images.0.url}}" />
//     </div>
//     <div class="media-body">
//       <dl class="dl-horizontal">
//         <dt>Display name</dt><dd class="clearfix">{{display_name}}</dd>
//         <dt>Id</dt><dd>{{id}}</dd>
//         <dt>Email</dt><dd>{{email}}</dd>
//         <dt>Spotify URI</dt><dd><a href="{{external_urls.spotify}}">{{external_urls.spotify}}</a></dd>
//         <dt>Link</dt><dd><a href="{{href}}">{{href}}</a></dd>
//         <dt>Profile Image</dt><dd class="clearfix"><a href="{{images.0.url}}">{{images.0.url}}</a></dd>
//         <dt>Country</dt><dd>{{country}}</dd>
//       </dl>
//     </div>
//   </div>
// </script>

// <script id="oauth-template" type="text/x-handlebars-template">
//   <h2>oAuth info</h2>
//   <dl class="dl-horizontal">
//     <dt>Access token</dt><dd class="text-overflow">{{access_token}}</dd>
//     <dt>Refresh token</dt><dd class="text-overflow">{{refresh_token}}</dd>
//   </dl>
// </script>



// <script>      (function() {

//   /**
//    * Obtains parameters from the hash of the URL
//    * @return Object
//    */
//   function getHashParams() {
//     var hashParams = {};
//     var e, r = /([^&;=]+)=?([^&;]*)/g,
//         q = window.location.hash.substring(1);
//     while ( e = r.exec(q)) {
//        hashParams[e[1]] = decodeURIComponent(e[2]);
//     }
//     return hashParams;
//   }

//   var userProfileSource = document.getElementById('user-profile-template').innerHTML,
//       userProfileTemplate = Handlebars.compile(userProfileSource),
//       userProfilePlaceholder = document.getElementById('user-profile');

//   var oauthSource = document.getElementById('oauth-template').innerHTML,
//       oauthTemplate = Handlebars.compile(oauthSource),
//       oauthPlaceholder = document.getElementById('oauth');

//   var params = getHashParams();

//   var access_token = params.access_token,
//       refresh_token = params.refresh_token,
//       error = params.error;

//   if (error) {
//     alert('There was an error during the authentication');
//   } else {
//     if (access_token) {
//       // render oauth info
//       oauthPlaceholder.innerHTML = oauthTemplate({
//         access_token: access_token,
//         refresh_token: refresh_token
//       });

//       $.ajax({
//           url: 'https://api.spotify.com/v1/me',
//           headers: {
//             'Authorization': 'Bearer ' + access_token
//           },
//           success: function(response) {
//             userProfilePlaceholder.innerHTML = userProfileTemplate(response);

//             $('#login').hide();
//             $('#loggedin').show();
//           }
//       });
//     } else {
//         // render initial screen
//         $('#login').show();
//         $('#loggedin').hide();
//     }

//     document.getElementById('obtain-new-token').addEventListener('click', function() {
//       $.ajax({
//         url: '/refresh_token',
//         data: {
//           'refresh_token': refresh_token
//         }
//       }).done(function(data) {
//         access_token = data.access_token;
//         oauthPlaceholder.innerHTML = oauthTemplate({
//           access_token: access_token,
//           refresh_token: refresh_token
//         });
//       });
//     }, false);
//   }
// })();
// </script> 















// /**
//  * This is an example of a basic node.js script that performs
//  * the Authorization Code oAuth2 flow to authenticate against
//  * the Spotify Accounts.
//  *
//  * For more information, read
//  * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
//  */

// var express = require('express'); // Express web server framework
// var request = require('request'); // "Request" library
// var cors = require('cors');
// var querystring = require('querystring');
// var cookieParser = require('cookie-parser');

// var client_id = '81b2ae10c8284eed98d0d89bbd2ba4fa'; // Your client id
// var client_secret = '9f489b7837934e1f9f34c765adb318a2'; // Your secret
// var redirect_uri = '/'; // Your redirect uri

// /**
//  * Generates a random string containing numbers and letters
//  * @param  {number} length The length of the string
//  * @return {string} The generated string
//  */
// var generateRandomString = function(length) {
//   var text = '';
//   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };

// var stateKey = 'spotify_auth_state';

// var app = express();

// app.use(express.static(__dirname + '/public'))
//    .use(cors())
//    .use(cookieParser());

// app.get('/login', function(req, res) {

//   var state = generateRandomString(16);
//   res.cookie(stateKey, state);

//   // your application requests authorization
//   var scope = 'user-read-private user-read-email';
//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// });

// app.get('/callback', function(req, res) {

//   // your application requests refresh and access tokens
//   // after checking the state parameter

//   var code = req.query.code || null;
//   var state = req.query.state || null;
//   var storedState = req.cookies ? req.cookies[stateKey] : null;

//   if (state === null || state !== storedState) {
//     res.redirect('/#' +
//       querystring.stringify({
//         error: 'state_mismatch'
//       }));
//   } else {
//     res.clearCookie(stateKey);
//     var authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//       },
//       json: true
//     };

//     request.post(authOptions, function(error, response, body) {
//       if (!error && response.statusCode === 200) {

//         var access_token = body.access_token,
//             refresh_token = body.refresh_token;

//         var options = {
//           url: 'https://api.spotify.com/v1/me',
//           headers: { 'Authorization': 'Bearer ' + access_token },
//           json: true
//         };

//         // use the access token to access the Spotify Web API
//         request.get(options, function(error, response, body) {
//           console.log(body);
//         });

//         // we can also pass the token to the browser to make requests from there
//         res.redirect('/#' +
//           querystring.stringify({
//             access_token: access_token,
//             refresh_token: refresh_token
//           }));
//       } else {
//         res.redirect('/#' +
//           querystring.stringify({
//             error: 'invalid_token'
//           }));
//       }
//     });
//   }
// });

// app.get('/refresh_token', function(req, res) {

//   // requesting access token from refresh token
//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };

//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token;
//       res.send({
//         'access_token': access_token
//       });
//     }
//   });
// });

// console.log('Listening on 8888');
// app.listen(8888);