import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';

// export interface Item {
//   id: number;
//   name: string;
//   description: string;
//   qty: number;
// }
@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findOne(id: number): Promise<Item> {
    return await this.itemRepository.findOne({ where: { id } });
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = this.itemRepository.create(createItemDto);
    return await this.itemRepository.save(newItem);
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    await this.itemRepository.update(id, updateItemDto);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
