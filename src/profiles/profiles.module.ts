import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { User } from '../users/entities/user.entity';
import { Device } from '../devices/entities/device.entity';
import { Rating } from '../ratings/entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User,Device, Rating])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
