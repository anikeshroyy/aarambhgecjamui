const fs = require('fs');

process.on('uncaughtException', (err) => {
  fs.writeFileSync('crash.log', 'Sync Uncaught Exception: ' + err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  fs.writeFileSync('crash.log', 'Sync Unhandled Rejection: ' + reason);
  process.exit(1);
});

require('./src/index.js');
