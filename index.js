const https = require('https');
const fs = require('fs');

const token = '645389251:AAHYK9Q1CUXTNB9zwFtN0YlhisThV9hPNpg';
const channel = '@logNotifier';
const file = 'text.txt';

fs.watchFile(file, (curr, prev) => {
    fs.open(file, 'r', (err, fd) => {
        if (err) throw err;

        let buffer = Buffer.alloc(2000);
        fs.read(fd, buffer, 0, curr.size - prev.size, prev.size, (err, num) => {
            let msg = buffer.toString('utf8', 0, num);
            https.get(
                `https://api.telegram.org/bot${token}/sendMessage?chat_id=${channel}&text=${msg}`
            );
        });
    });
});
