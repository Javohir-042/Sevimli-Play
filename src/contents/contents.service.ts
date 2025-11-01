import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content) private readonly contentRepo: Repository<Content>,
  ) { }

  async create(createContentDto: CreateContentDto) {

    const contents = this.contentRepo.create({ ...createContentDto })

    return this.contentRepo.save(contents)
  }

  findAll() {
    return this.contentRepo.find({ order: { id: 'ASC' } })
  }

  async findOne(id: number) {
    const content = await this.contentRepo.findOneBy({ id })
    if (!content) {
      throw new NotFoundException("Content id not found")
    }

    return content;
  }

  async update(id: number, updateContentDto: UpdateContentDto) {
    const content = await this.contentRepo.findOneBy({ id })
    if (!content) {
      throw new NotFoundException("Content id not found")
    }

    Object.assign(content, updateContentDto);

    return this.contentRepo.save(content);
  }

  async remove(id: number) {
    const content = await this.contentRepo.delete({ id })
    if(content.affected === 0) {
      throw new NotFoundException("content not found")
    }
    return { message: "id o'chirildi"}
  }
}
