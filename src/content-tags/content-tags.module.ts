import { Module } from '@nestjs/common';
import { ContentTagsService } from './content-tags.service';
import { ContentTagsController } from './content-tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentTag } from './entities/content-tag.entity';
import { Content } from '../contents/entities/content.entity';
import { Tag } from '../tags/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentTag, Content, Tag])],
  controllers: [ContentTagsController],
  providers: [ContentTagsService],
})
export class ContentTagsModule {}
