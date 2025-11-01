import { Module } from '@nestjs/common';
import { ThumbnailsService } from './thumbnails.service';
import { ThumbnailsController } from './thumbnails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thumbnail } from './entities/thumbnail.entity';
import { Content } from '../contents/entities/content.entity';
import { Episode } from '../episodes/entities/episode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Thumbnail, Content, Episode])],
  controllers: [ThumbnailsController],
  providers: [ThumbnailsService],
})
export class ThumbnailsModule {}
