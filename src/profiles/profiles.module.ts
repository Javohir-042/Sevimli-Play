import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { User } from '../users/entities/user.entity';
import { Device } from '../devices/entities/device.entity';
import { Rating } from '../ratings/entities/rating.entity';
import { WatchHistory } from '../watch_histories/entities/watch_history.entity';
import { Comment } from '../comments/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User,Device, Rating, WatchHistory, Comment])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
