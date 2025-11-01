import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { ContentTag } from '../content-tags/entities/content-tag.entity';
import { ContentCategory } from '../content-categories/entities/content-category.entity';
import { Rating } from '../ratings/entities/rating.entity';
import { Episode } from '../episodes/entities/episode.entity';
import { Thumbnail } from '../thumbnails/entities/thumbnail.entity';
import { WatchHistory } from '../watch_histories/entities/watch_history.entity';
import { Comment } from '../comments/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content, ContentTag, ContentCategory, Rating, Episode, Thumbnail, WatchHistory, Comment])],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule { }
