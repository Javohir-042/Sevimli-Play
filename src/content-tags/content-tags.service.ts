import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentTagDto } from './dto/create-content-tag.dto';
import { UpdateContentTagDto } from './dto/update-content-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentTag } from './entities/content-tag.entity';
import { Repository } from 'typeorm';
import { Content } from '../contents/entities/content.entity';
import { Tag } from '../tags/entities/tag.entity';

@Injectable()
export class ContentTagsService {
  constructor(
    @InjectRepository(ContentTag) private readonly contentTagRepo: Repository<ContentTag>,
    @InjectRepository(Content) private readonly contentRepo: Repository<Content>,
    @InjectRepository(Tag) private readonly tagRepo: Repository<Tag>,
  ) { }

  async create(createContentTagDto: CreateContentTagDto) {
    const { content_id, tag_id } = createContentTagDto

    const content = await this.contentRepo.findOne({ where: { id: content_id } })
    if (!content) {
      throw new NotFoundException("Content not found")
    }

    const tag = await this.tagRepo.findOne({ where: { id: tag_id } })
    if (!tag) {
      throw new NotFoundException("Tag not found")
    }

    const contentTag = this.contentTagRepo.create({ ...createContentTagDto, content, tag })
    return this.contentTagRepo.save(contentTag);
  }

  findAll() {
    return this.contentTagRepo.find({ relations: ['content', 'tag'], order: { id: 'ASC' } })
  }

  async findOne(id: number) {
    const contentTag = await this.contentTagRepo.findOne({ where: { id },relations: ['content', 'tag'] })
    if (!contentTag) {
      throw new NotFoundException("ContentTag id not found")
    }

    return contentTag;
  }

  async update(id: number, updateContentTagDto: UpdateContentTagDto) {
    const contentTag = await this.contentTagRepo.findOneBy({ id })
    if (!contentTag) {
      throw new NotFoundException("ContentTag id not found")
    }

    const { content_id, tag_id, ...rest } = updateContentTagDto;

    if (content_id) {
      const content = await this.contentRepo.findOne({ where: { id: content_id } })
      if (!content) {
        throw new NotFoundException("Content id not found")
      }

      contentTag.content = content;
    }

    if (tag_id) {
      const tag = await this.tagRepo.findOne({ where: { id: tag_id } })
      if (!tag) {
        throw new NotFoundException("Tag id not found")
      }

      contentTag.tag = tag;
    }

    Object.assign(contentTag, rest)

    return this.contentTagRepo.save(contentTag);
  }

  async remove(id: number) {
    const contentTag = await this.contentTagRepo.delete({ id })
    if (contentTag.affected === 0) {
      throw new NotFoundException("ContentTag not found")
    }
    return { messag: "id o'childi" }
  }
}
