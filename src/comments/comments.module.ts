import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Content } from '../contents/entities/content.entity';
import { Episode } from '../episodes/entities/episode.entity';
import { Profile } from '../profiles/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Content, Episode, Profile])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }
