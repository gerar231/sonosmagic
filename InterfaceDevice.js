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
    if (err) {return console.log(err); }

    console.log(body.url);

    console.log(body.explanation);
})