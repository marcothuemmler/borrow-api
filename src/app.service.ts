import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getHello(res: Response) {
    res.status(200).send();
  }
}
