export const createAuthorize = () => {
    var client_id = "3ca08a69-9582-48b9-9479-76a34805704e";
    var redirect_uri = "http://localhost:3000/control-select-view";
    var response_type = "code";
    var scope = "playback-control-all";
    var state = "RANDOM-STATE";

    var loginUrl = "https://api.sonos.com/login/v3/oauth?client_id=" + client_id + "&response_type=" + response_type + "&state=" + state + "&scope=" + scope + "&redirect_uri=" + redirect_uri;

    window.open(loginUrl, "_self");
}