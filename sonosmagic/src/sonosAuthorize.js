export const createAuthorize = () => {
        var client_id = "3ca08a69-9582-48b9-9479-76a34805704e";
        var redirect_uri = "http://localhost:3000";
        var response_type = "code";
        var scope = "playback-control-all";
        var state = "RANDOM-STATE";

        var loginUrl = "https://api.sonos.com/login/v3/oauth?client_id=" + client_id + "&response_type=" + response_type + "&state=" + state + "&scope=" + scope + "&redirect_uri=" + redirect_uri;

        window.open(loginUrl, "_self");

        // OAuth1.0 - 3-legged server side flow (Twitter example)
        // step 1
        var qs = require('querystring');
        var oauth = {
                callback: 'http://localhost:3000',
                consumer_key: CONSUMER_KEY,
                consumer_secret: CONSUMER_SECRET
        };
        request.post({url: url, oauth: oauth}, function (e, r, body) {
            // Ideally, you would take the body in the response
            // and construct a URL that a user clicks on (like a sign in button).
            // The verifier is only available in the response after a user has
            // verified with twitter that they are authorizing your app.

            // step 2
            var req_data = qs.parse(body)
            var uri = 'https://api.twitter.com/oauth/authenticate' +
                '?' + qs.stringify({
                    oauth_token: req_data.oauth_token
                })
            // redirect the user to the authorize uri

            // step 3
            // after the user is redirected back to your server
            var auth_data = qs.parse(body),
                oauth = {
                    consumer_key: CONSUMER_KEY,
                    consumer_secret: CONSUMER_SECRET,
                    token: auth_data.oauth_token,
                    token_secret: req_data.oauth_token_secret,
                    verifier: auth_data.oauth_verifier
                },
                url = 'https://api.twitter.com/oauth/access_token';
            request.post({
                url: url,
                oauth: oauth
            }, function (e, r, body) {
                // ready to make signed requests on behalf of the user
                var perm_data = qs.parse(body),
                    oauth = {
                        consumer_key: CONSUMER_KEY,
                        consumer_secret: CONSUMER_SECRET,
                        token: perm_data.oauth_token,
                        token_secret: perm_data.oauth_token_secret
                    },
                    url = 'https://api.twitter.com/1.1/users/show.json',
                    qs = {
                        screen_name: perm_data.screen_name,
                        user_id: perm_data.user_id
                    };
                request.get({
                    url: url,
                    oauth: oauth,
                    qs: qs,
                    json: true
                }, function (e, r, user) {
                    console.log(user)
                })
            })
        })