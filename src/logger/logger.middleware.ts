import { Injectable, NestMiddleware } from '@nestjs/common';
import { MyLoggerService } from './logger.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`Incoming request: ${req.method} ${req.url}`);

    res.on('finish', () => {
      this.logger.log(`Response status: ${res.statusCode}`);
    });
    next();
  }
}
