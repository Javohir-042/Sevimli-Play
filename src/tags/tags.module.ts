import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { ContentTag } from '../content-tags/entities/content-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, ContentTag])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
