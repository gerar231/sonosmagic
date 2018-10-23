const request = require('request');
class InterfaceDevice {
    constructor(defaults) {
        // authorize

        // discover

        // subscribe
    }

    GetUserInput(interfaceTypeId) {
        // Determine input type.
    }

    GetRequest(userInput, defaults = ['default here'], speakers) {
        // According to parsed user input data, call RequestMonitor or RequestMonitorStop to set up.
    }

    GetSpeakerList() {
        var household_ID; // Household ID to access speakerList within one network. Make this global.
        var groupData; // JSON object.
        request.request('https://api.ws.sonos.com/control/api/v1', function(err, res, body) {
            var obj = JSON.parse(body);
            household_ID = obj.id;
            console.log("household_ID received."); // Testing...
        })
        request.request('https://api.ws.sonos.com/control/api/v1/households/' + String(household_ID) + '/groups',
                function(err, res, body) {
                groupData = JSON.parse(body);
                console.log("groupData received."); // Testing...
        });
        return groupData;
    }

    Request(requestId, inputs = ['default'], speakers = ['default']) {
       // calls RequestMonitorStop & Request Monitor
    }

    RequestMonitorStop(monitorInputs = []) {
        var groupData = this.GetSpeakerList(); // gets from SONOS regarding speakers.
        var removeJSON = "\"playerIdsToAdd\" : " + JSON.stringify(monitorInputs); // Formats the string to be sent to SONOS.
        if (groupData.groups.length == 0) {
            // print error: there are no groups active.
        } else {
            var setUpRemove = {
                uri: 'https://api.ws.sonos.com/control/api/v1/groups/' + String(groupData.groups[0]) + "/groups/modifyGroupMembers", // as found on website.
                body: String(setUpRemove), 
                method: 'PUT'
            }
            request.request(setUpRemove, function(err, res, body) {
                console.log(err);
                console.log(body);
            })
            console.log("Request to stop monitoring has been sent."); // Testing...
        }
        // Maybe return updated list after the sync. 
    }

    RequestMonitor(monitorInputs = []) {
        var speakerJSON = "\"playerIds\" : " + JSON.stringify(speakers); // Put the speakers into JSON format.
        // Proceed if Request = set up a sync
        var setUpGroup = {
            uri: 'https://api.ws.sonos.com/control/api/v1/households/' + String(household_ID) + '/groups/createGroup',
            body: String(speakerJSON),
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' // do we have to specify a header?
            }
        }
        request.request(setUpGroup, function(err, res, body) {
            console.log(err);
            console.log(body);
        });
        // creating a new group with the provided speakerIDs. These speakers will be synced. 
        // Maybe return updated list with the speakers that are synced?
    }

    // Note: nameAudioClip => The name the user saves the audioclip as.
    //       websiteName => identifies app that created audioclip. Must be inputted as reverse. Ex: "com.apple"
    //       streamURL => URL where the clip is streaming from.
    //       loop => Conditional user to provide if the clip should loop or not.
    RequestPing(pingInputs = [], nameAudioClip, websiteName, streamURL, loop) {
        var groupData = this.GetSpeakerList(); // gets from SONOS regarding speakers.
        if (groupData.groups.length ==  0) {
            this.RequestMonitor(); // must set up a sync before attempting to schedule audio clip.
        } else {
            var audioClipReq = JSON.stringify({"name": nameAudioClip, "appID": websiteName, 
                                            "streamURL": streamURL, "shouldLoop": loop, 
                                            "clipType": "CUSTOM"});

            var pinSetUp = {
                uri: 'https://api.ws.sonos.com/control/api/v1/groups/' + String(groupData.groups[0]) + "/audioClip", // as found on website.
                body: String(audioClipReq),
                method: 'POST',
            }
            request.request(audioClipReq, function(err, res, body) {
                console.log(err);
                console.log(body);
                // return body as well. (If this is the response from SONOS).
            })
            console.log("AudioClip is scheduled."); // Testing...
        }
    }

}



