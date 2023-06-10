import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  imports: [TypeOrmModule.forFeature([Image])]
})
export class CommonModule {}
