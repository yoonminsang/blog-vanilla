import { createLogger, format, transports } from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

const myFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.splat(),
    format.json(),
    myFormat,
  ),
  transports: [
    new WinstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: 'logs/error',
      filename: `%DATE%.error.log`,
      maxFiles: '30d',
      zippedArchive: true,
    }),
    new WinstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: 'logs',
      filename: `%DATE%.debug.log`,
      maxFiles: '30d',
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

export default logger;
