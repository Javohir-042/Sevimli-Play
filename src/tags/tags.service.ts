import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private readonly tagsRepo: Repository<Tag>,
  ) { }

  async create(createTagDto: CreateTagDto) {
    const tag = this.tagsRepo.create({ ...createTagDto })

    return this.tagsRepo.save(tag)
  }

  findAll() {
    return this.tagsRepo.find({ order: { id: 'DESC' } })
  }

  async findOne(id: number) {
    const tags = await this.tagsRepo.findOneBy({ id })
    if (!tags) {
      throw new NotFoundException("Tags id not found")
    }

    return tags;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tags = await this.tagsRepo.findOneBy({ id })
    if (!tags) {
      throw new NotFoundException("Tags id not found")
    }

    Object.assign(tags, updateTagDto);

    return this.tagsRepo.save(tags);
  }

  async remove(id: number) {
    const tags = await this.tagsRepo.delete({ id })
    if (tags.affected === 0) {
      throw new NotFoundException("Tags not found")
    }
    return { message: "id o'chirildi" }
  }
}
