import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { ContentTag } from '../content-tags/entities/content-tag.entity';
import { ContentCategory } from '../content-categories/entities/content-category.entity';
import { Rating } from '../ratings/entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content, ContentTag, ContentCategory, Rating])],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
