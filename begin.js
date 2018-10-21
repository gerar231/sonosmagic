const request = require('request');
class InterfaceDevice {
    constructor(defaults) {
        // authorize

        // discover

        // subscribe
    }

    GetUserInput(interfaceTypeId) {

    }

    GetRequest(userInput, defaults = ['default here'], speakers) {
        
    }

    GetSpeakerList() {
        var household_ID; // Household ID to access speakerList within one network. Make this global.
        var groupData; // JSON object.
        request.request('https://api.ws.sonos.com/control/api/v1', function(err, res, body) {
            var obj = JSON.parse(body);
            household_ID = obj.id;
            console.log("household_ID received.");
        })
        request.request('https://api.ws.sonos.com/control/api/v1/households/' + String(household_ID) + '/groups',
                function(err, res, body) {
                groupData = JSON.parse(body);
                console.log("groupData received.");
        });
        return groupData;
    }

    Request(requestId, inputs = ['default'], speakers = ['default']) {
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

        // Proceed if Request = unsync
        var groupData = this.GetSpeakerList();
        var removeJSON = "\"playerIdsToAdd\" : " + JSON.stringify(speakers); 
        if (groupData.groups.length == 0) {
            // print error: there are no groups active.
        } else {
            var setUpRemove = {https://api.ws.sonos.com/control/api/v1/
                uri: '' // complete... 
            }
        }
    }

}



