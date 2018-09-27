const request = require('request');
const fs = require('fs');

const token = '';
const channel = '';
const username = '';
const url = '';
const file = '';
const bufferSize = 2000;

fs.watchFile(file, (curr, prev) => {
    fs.open(file, 'r', (err, fd) => {
        if (err) throw err;

        let buffer = Buffer.alloc(bufferSize);
        fs.read(fd, buffer, 0, curr.size - prev.size, prev.size, (err, num) => {
            let msg = buffer.toString('utf8', 0, num);
            request.post(
                url, {
                    form: {
                        token,
                        channel,
                        username,
                        text: msg
                    }
                }, function (error, response, body) {
                    console.log(error);
                    console.log(body);
                    console.log(response);
                });
        });
    });
});
