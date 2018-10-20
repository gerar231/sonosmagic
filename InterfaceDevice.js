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

    }

    Request(requestId, inputs = ['default'], speakers = ['default']) {

    }

}

const request = require('request');

request('', {json: true}, (err, res, body) => {
    console.log("error:", error);
    console.log("statusCode:", response && response.statusCode);
    console.log("body:", body);
}); 