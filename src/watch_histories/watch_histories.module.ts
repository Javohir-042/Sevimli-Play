import { Module } from '@nestjs/common';
import { WatchHistoriesService } from './watch_histories.service';
import { WatchHistoriesController } from './watch_histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchHistory } from './entities/watch_history.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { Content } from '../contents/entities/content.entity';
import { Episode } from '../episodes/entities/episode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WatchHistory, Profile, Content, Episode])],
  controllers: [WatchHistoriesController],
  providers: [WatchHistoriesService],
})
export class WatchHistoriesModule {}
