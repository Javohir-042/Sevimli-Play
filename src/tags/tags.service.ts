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
    const existingTag = await this.tagsRepo.findOneBy({ name: createTagDto.name });

    if (existingTag) {
      throw new NotFoundException(`"${createTagDto.name}" nomli tag allaqachon mavjud`);
    }

    const tag = this.tagsRepo.create({ ...createTagDto });
    return this.tagsRepo.save(tag);
  }


  findAll() {
    return this.tagsRepo.find({ order: { id: 'ASC' } })
  }

  async findOne(id: number) {
    const tags = await this.tagsRepo.findOneBy({ id })
    if (!tags) {
      throw new NotFoundException("Tags id not found")
    }

    return tags;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    
    const tag = await this.tagsRepo.findOneBy({ id });
    if (!tag) {
      throw new NotFoundException("Tag id not found");
    }

    if (updateTagDto.name && updateTagDto.name !== tag.name) {
      const existingTag = await this.tagsRepo.findOneBy({ name: updateTagDto.name });
      if (existingTag) {
        throw new NotFoundException(`${updateTagDto.name} nomli tag allaqachon mavjud`);
      }
    }

    Object.assign(tag, updateTagDto);

    return this.tagsRepo.save(tag);
  }


  async remove(id: number) {
    const tags = await this.tagsRepo.delete({ id })
    if (tags.affected === 0) {
      throw new NotFoundException("Tags not found")
    }
    return { message: "id o'chirildi" }
  }
}
