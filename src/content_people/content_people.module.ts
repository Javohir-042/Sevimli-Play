import { Module } from '@nestjs/common';
import { ContentPeopleService } from './content_people.service';
import { ContentPeopleController } from './content_people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentPeople } from './entities/content_people.entity';
import { Content } from '../contents/entities/content.entity';
import { People } from '../people/entities/people.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentPeople, Content, People])],
  controllers: [ContentPeopleController],
  providers: [ContentPeopleService],
})
export class ContentPeopleModule {}
