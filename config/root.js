const fs = require('fs');

module.exports = {
  ssl: {
    key: fs.readFileSync('/etc/letsencrypt/live/zenproject.ru/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/zenproject.ru/fullchain.pem')
  }
};
