import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class MyLoggerService implements NestLoggerService {
  private readonly logger: winston.Logger;
  constructor() {
    const isDevelopment = process.env.NODE_ENV !== 'production';

    this.logger = winston.createLogger({
      level: isDevelopment ? 'debug' : 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: any, trace: string) {
    this.logger.error(message, { trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
