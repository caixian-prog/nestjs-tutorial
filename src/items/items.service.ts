import { Injectable } from '@nestjs/common';

export interface Item {
  id: number;
  name: string;
  description: string;
  qty: number;
}
@Injectable()
export class ItemsService {}
