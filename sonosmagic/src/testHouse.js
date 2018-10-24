// a fake house intended to represent the minimal state/knowledge required for
// the user to walk through the basic controller interactions


// returns a simple string list of speaker group names
export const getGroups = () => {
    return ["Living Room", "Kitchen", "Study", "Lounge"];
}


// returns JSON object that contains various
// data which provides context for "connect" interactions
// with the controller
export const getConnectData = () => {
    var data = {
        "Set an alarm": ["Morning, Evening, Afternoon"],
        "Send a reminder": ["Dinner at 6pm.", "Practice at 2pm.", "Take out the trash."],
        "Call to me": ["Please call Paige.", "Come down for dinner.", "We're leaving soon."]
    }
    return data;
}