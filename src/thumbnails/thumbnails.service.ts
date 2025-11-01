import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateThumbnailDto } from './dto/create-thumbnail.dto';
import { UpdateThumbnailDto } from './dto/update-thumbnail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Thumbnail } from './entities/thumbnail.entity';
import { Repository } from 'typeorm';
import { Content } from '../contents/entities/content.entity';
import { Episode } from '../episodes/entities/episode.entity';

@Injectable()
export class ThumbnailsService {
  constructor(
    @InjectRepository(Thumbnail) private readonly thrumbnailRepo: Repository<Thumbnail>,
    @InjectRepository(Content) private readonly contentRepo: Repository<Content>,
    @InjectRepository(Episode) private readonly episodeRepo: Repository<Episode>,
  ) { }

  async create(createThumbnailDto: CreateThumbnailDto) {
    const { content_id, episode_id } = createThumbnailDto;

    const content = await this.contentRepo.findOne({ where: { id: content_id } })
    if (!content) {
      throw new NotFoundException("Content not found")
    }

    const episode = await this.episodeRepo.findOne({ where: { id: episode_id } })
    if (!episode) {
      throw new NotFoundException("Episode not found")
    }

    const newThumbnail = this.thrumbnailRepo.create({
      ...createThumbnailDto,
      content,
      episode,
    } as any);


    return this.thrumbnailRepo.save(newThumbnail)
  }

  findAll() {
    return this.thrumbnailRepo.find({ relations: ['content', 'episode'], order: { id: 'ASC' } })
  }

  async findOne(id: number) {
    const thrumbnail = await this.thrumbnailRepo.findOne({ where: { id }, relations: ['content', 'episode'] })
    if (!thrumbnail) {
      throw new NotFoundException("Bunday id mavjud emas")
    }

    return thrumbnail;
  }

  async update(id: number, updateThumbnailDto: UpdateThumbnailDto) {
    const thumbnail = await this.thrumbnailRepo.findOne({ where: { id } })
    if (!thumbnail) {
      throw new NotFoundException("Thumbnail not found")
    }

    const { content_id, episode_id, ...rest } = updateThumbnailDto

    if (content_id) {
      const content = await this.contentRepo.findOne({ where: { id: content_id } })
      if (!content) {
        throw new NotFoundException("Contetn id not found")
      }

      thumbnail.content = content;
    }

    if (episode_id) {
      const episode = await this.episodeRepo.findOne({ where: { id: episode_id } })
      if(!episode){
        throw new NotFoundException("Episode id not found")
      }

      thumbnail.episode = episode;
    }

    Object.assign(thumbnail, rest)

    return this.thrumbnailRepo.save(thumbnail);
  }

  async remove(id: number) {
    const thumbnail = await this.thrumbnailRepo.delete({ id })
    if(thumbnail.affected === 0) {
      throw new NotFoundException("Thumbnails id not found")
    }
    return {message: `id o'chirildi`}
  }
}
