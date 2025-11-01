import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateContentPeopleDto } from './dto/update-content_people.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentPeople } from './entities/content_people.entity';
import { Repository } from 'typeorm';
import { Content } from '../contents/entities/content.entity';
import { People } from '../people/entities/people.entity';
import { CreateContentPeopleDto } from './dto/create-content_people.dto';

@Injectable()
export class ContentPeopleService {
  constructor(
    @InjectRepository(ContentPeople) private readonly contentPeopleRepo: Repository<ContentPeople>,
    @InjectRepository(Content) private readonly contentRepo: Repository<Content>,
    @InjectRepository(People) private readonly peopleRepo: Repository<People>,
  ) { }


  async create(createContentPeopleDto: CreateContentPeopleDto) {
    const { content_id, people_id } = createContentPeopleDto;

    const content = await this.contentRepo.findOne({ where: { id: content_id } })
    if (!content) {
      throw new NotFoundException("Content not found")
    }

    const people = await this.peopleRepo.findOne({ where: { id: people_id } })
    if (!people) {
      throw new NotFoundException("people not found")
    }

    const media_file = this.contentPeopleRepo.create({ ...createContentPeopleDto, content, people })

    return this.contentPeopleRepo.save(media_file)
  }

  findAll() {
    return this.contentPeopleRepo.find({ relations: ['content', 'people'], order: { id: 'ASC' } })
  }

  async findOne(id: number) {
    const media_file = await this.contentPeopleRepo.findOne({ where: { id }, relations: ['content', 'people'] })
    if (!media_file) {
      throw new NotFoundException("Media_file not found")
    }

    return media_file;
  }

  async update(id: number, updateContentPeopleDto: UpdateContentPeopleDto) {
    const media_file = await this.contentPeopleRepo.findOne({ where: { id } })
    if (!media_file) {
      throw new NotFoundException("Media_file not found")
    }

    const { content_id, people_id, ...rest } = updateContentPeopleDto

    if (content_id) {
      const content = await this.contentRepo.findOne({ where: { id: content_id } })
      if (!content) {
        throw new NotFoundException(" Content not found")
      }

      media_file.content = content;
    }

    if (people_id) {
      const people = await this.peopleRepo.findOne({ where: { id: people_id } })
      if (!people) {
        throw new NotFoundException(" people not found")
      }

      media_file.people = people;
    }

    Object.assign(media_file, rest)

    return this.contentPeopleRepo.save(media_file)
  }

  async remove(id: number) {
    const media_file = await this.contentPeopleRepo.delete({ id })
    if (media_file.affected == 0) {
      throw new NotFoundException("Media_file not found")
    }

    return { message: `id o'chirildi` }
  }
}
