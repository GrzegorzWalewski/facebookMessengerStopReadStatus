# facebookMessengerStopReadStatus

This script changes timestamp in read status update request to 04/08/2023, which result in not updating it. 

## IMPORTANT
- sending messages will update read status
- reacting to messages will update read status

## How? Why? and What?

This script injects itself into WebSocket's send() method, and changes timestamp in `last_seen_time_ms` to 1690985020. This way facebook doesn't update the time we last read message. I also tried do the same thing with sending messages and reactions (same thing You can see in Instander app), but it resulted on a way longer message sending, showed "no internet connection" message several times. And when message is finnaly sent it updates read status anyway. I'm assuming, after investigating requests, that facebook send messages as "conversation update", and if new message's timestamp < last message's timestamp, conversation is not updated.