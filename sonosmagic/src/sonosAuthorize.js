export const testAuthorize = () => {
    var client_id = "3ca08a69-9582-48b9-9479-76a34805704e";
    var redirect_uri = "http://localhost:3000";
    var response_type = "code";
    var scope = "playback-control-all";
    var state = "RANDOM-STATE";

    var loginUrl = "https://api.sonos.com/login/v3/oauth?client_id=" + client_id + "&response_type=" + response_type + "&state=" + state +"&scope=" + scope + "&redirect_uri=" + redirect_uri;

    window.open(loginUrl, "_self");
    
   /* var request = require('request');

    request(loginUrl, function(error, response, body) {
        console.log("error:", error);
        console.log("statusCode:", response && response.statusCode);
        console.log("body:", body);
    });

    window.alert("test fired, check console."); */
    
    var code = "7bb5c3ca-5189-401a-b10e-644a62372725";
    var authorization = client_id + code;
    var tokenUrl = "https://api.sonos.com/login/v3/oauth/access.";
    var request = {
        url: tokenUrl,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            "Authorization": "Basic " + authorization,
        } 

    }
    request.post(request, function(err, res, body) {
        
    });
}

