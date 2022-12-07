import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Attribute } from '@attribute/attribute.entity';
import { CreateAttributeDto } from '@attribute/dto/create-attribute.dto';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
  ) {}

  async create(dto: CreateAttributeDto): Promise<Attribute> {
    const { value, name, type } = dto;

    const attribute = await this.attributeRepository.findOne({
      where: {
        value,
      },
    });

    if (attribute) {
      const errors = { message: 'This value already been registered' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newAttribute = new Attribute();
    newAttribute.name = name;
    newAttribute.type = type;
    newAttribute.value = value;

    const errors = await validate(newAttribute);
    if (errors.length > 0) {
      const _errors = { message: 'Value is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedAttribute = await this.attributeRepository.save(newAttribute);

      return savedAttribute;
    }
  }

  async getAll(): Promise<Attribute[]> {
    const attributes = await this.attributeRepository.find({
      relations: ['product'],
    });

    return attributes;
  }
}
