const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.File({
      level: 'warn',
      filename: '../warningLogs.log',
    }),
    new transports.File({
      level: 'error',
      filename: '../errorLogs.log',
    }),
  ],
  format: format.combine(format.json(), format.timestamp(), format.metadata(), format.prettyPrint()),
});

module.exports = logger;
