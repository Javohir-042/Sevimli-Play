import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../contents/entities/content.entity';
import { Episode } from './entities/episode.entity';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { Thumbnail } from '../thumbnails/entities/thumbnail.entity';
import { WatchHistory } from '../watch_histories/entities/watch_history.entity';
import { Comment } from '../comments/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Episode, Content, Thumbnail, WatchHistory, Comment])],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class WatchEpisodesModule { }
