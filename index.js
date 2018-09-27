const request = require('request');
const fs = require('fs');

const token = '';
const channel = '@';
const file = '';
const bufferSize = 2000;

fs.watchFile(file, (curr, prev) => {
    fs.open(file, 'r', (err, fd) => {
        if (err) throw err;

        let buffer = Buffer.alloc(bufferSize);
        fs.read(fd, buffer, 0, curr.size - prev.size, prev.size, (err, num) => {
            let msg = buffer.toString('utf8', 0, num);
            request.post(
                `https://slack.com/api/chat.postMessage`, {
                    form: {
                        "token": "",
                        "channel":"",
                        "username": "",
                        "text": ""
                    }
                }
            );
        });
    });
});
