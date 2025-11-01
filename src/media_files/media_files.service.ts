import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaFileDto } from './dto/create-media_file.dto';
import { UpdateMediaFileDto } from './dto/update-media_file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaFile } from './entities/media_file.entity';
import { Repository } from 'typeorm';
import { Content } from '../contents/entities/content.entity';
import { Episode } from '../episodes/entities/episode.entity';

@Injectable()
export class MediaFilesService {
  constructor(
    @InjectRepository(MediaFile) private readonly mediaFileRepo: Repository<MediaFile>,
    @InjectRepository(Content) private readonly contentRepo: Repository<Content>,
    @InjectRepository(Episode) private readonly episodeRepo: Repository<Episode>,
  ) { }

  async create(createMediaFileDto: CreateMediaFileDto) {
    const { content_id, episode_id } = createMediaFileDto;

    const content = await this.contentRepo.findOne({ where: { id: content_id } })
    if (!content) {
      throw new NotFoundException("Content not found")
    }

    const episode = await this.episodeRepo.findOne({ where: { id: episode_id } })
    if (!episode) {
      throw new NotFoundException("Episode not found")
    }

    const media_file = this.mediaFileRepo.create({ ...createMediaFileDto, content, episode })

    return this.mediaFileRepo.save(media_file)
  }

  findAll() {
    return this.mediaFileRepo.find({ relations: ['content', 'episode'], order: { id: 'ASC' } })
  }

  async findOne(id: number) {
    const media_file = await this.mediaFileRepo.findOne({ where: { id }, relations: ['content', 'episode'] })
    if (!media_file) {
      throw new NotFoundException("Media_file not found")
    }

    return media_file;
  }

  async update(id: number, updateMediaFileDto: UpdateMediaFileDto) {
    const media_file = await this.mediaFileRepo.findOne({ where: { id } })
    if (!media_file) {
      throw new NotFoundException("Media_file not found")
    }

    const { content_id, episode_id, ...rest } = updateMediaFileDto

    if (content_id) {
      const content = await this.contentRepo.findOne({ where: { id: content_id } })
      if (!content) {
        throw new NotFoundException(" Content not found")
      }

      media_file.content = content;
    }

    if (episode_id) {
      const episode = await this.episodeRepo.findOne({ where: { id: episode_id } })
      if (!episode) {
        throw new NotFoundException(" Episode not found")
      }

      media_file.episode = episode;
    }

    Object.assign(media_file, rest)

    return this.mediaFileRepo.save(media_file)
  }

  async remove(id: number) {
    const media_file = await this.mediaFileRepo.delete({ id })
    if(media_file.affected == 0){
      throw new NotFoundException("Media_file not found")
    }
  
    return { message: `id o'chirildi`}
  }
}
