import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Color } from '@color/color.entity';
import { CreateColorDto } from '@color/dto/create-color.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async create(dto: CreateColorDto): Promise<Color> {
    const { hex, name } = dto;
    const qb = await getRepository(Color)
      .createQueryBuilder('color')
      .where('color.hex = :hex', { hex });

    const color = await qb.getOne();

    if (color) {
      const errors = { hex: 'This color already been registered' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newColor = new Color();
    newColor.hex = hex;
    newColor.name = name;

    const errors = await validate(newColor);
    if (errors.length > 0) {
      const _errors = { hex: 'Hexadecimal is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedColor = await this.colorRepository.save(newColor);

      return savedColor;
    }
  }

  async getAll(): Promise<Color[]> {
    const colors = await this.colorRepository.find();

    return colors;
  }
}
