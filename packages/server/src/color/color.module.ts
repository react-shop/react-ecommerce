import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Color } from '@color/color.entity';
import { ColorService } from '@color/color.service';
import { ColorResolver } from '@color/color.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  providers: [ColorService, ColorResolver],
  exports: [ColorService],
})
export class ColorModule {}
