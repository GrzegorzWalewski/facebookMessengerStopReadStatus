// ==UserScript==
// @name         Don't send read status to server.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  
// @author       You
// @match        https://www.messenger.com/t/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=messenger.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function changeTimestamp(str) {
  // str is the input string
  var regex = /"last_seen_time_ms\\+\":\d+/g; // regular expression to match the timestamp
  var replacement = '"last_seen_time_ms\\\":1690985020'; // replacement string
  var result = str.replace(regex, replacement); // replace all matches with the replacement
        console.log(result);
  return result; // return the modified string
}

WebSocket.prototype.oldsend = WebSocket.prototype.send;
WebSocket.prototype.send = function(data) {
    var message = '';
    var wasArrayBuffer = false;
    if (data.constructor.name == "ArrayBuffer")
    {
        data = new Uint8Array(data);
        wasArrayBuffer = true;
    }
    message = String.fromCharCode(...data);
    if (!message.includes('last_seen_time_ms'))
    {

    } else {
        message = changeTimestamp(message);
var encoder = new TextEncoder(); // create a TextEncoder instance
data = encoder.encode(message); // encode the string as Uint8Array
if (wasArrayBuffer) {
    data = data.buffer; // get the ArrayBuffer from the Uint8Array
}
console.log(message);
    }
    WebSocket.prototype.oldsend.apply(this, [data]);
};

})();