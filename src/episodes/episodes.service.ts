import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../contents/entities/content.entity';
import { Episode } from './entities/episode.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode) private readonly episodeRepo: Repository<Episode>,
    @InjectRepository(Content) private readonly contentRepo: Repository<Content>
  ) { }

  async create(createEpisodeDto: CreateEpisodeDto) {
    const { content_id } = createEpisodeDto;

    const content = await this.contentRepo.findOne({ where: { id: content_id } })
    if (!content) {
      throw new NotFoundException("Content not found")
    }

    const episode = this.episodeRepo.create({ ...createEpisodeDto, content })

    return this.episodeRepo.save(episode)
  }

  findAll() {
    return this.episodeRepo.find({ relations: ['content'], order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const episode = await this.episodeRepo.findOne({ where: { id }, relations: ['content'] })
    if (!episode) {
      throw new NotFoundException("episode id not found")
    }
    return episode;
  }

  async update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    const episode = await this.episodeRepo.findOneBy({ id })
    if (!episode) {
      throw new NotFoundException("Bunday id mavjud emas")
    }

    const { content_id, ...rest } = updateEpisodeDto;

    if (content_id) {
      const content = await this.contentRepo.findOne({ where: { id: content_id } })
      if (!content) {
        throw new NotFoundException("Content id not found ")
      }

      episode.content = content;
    }

    Object.assign(episode, rest)

    return this.episodeRepo.save(episode);
  }

  async remove(id: number) {
    const episode = await this.episodeRepo.delete({ id })
    if (episode.affected === 0) {
      throw new NotFoundException(" episode not found")
    }

    return { message: `id o'chirildi` };
  }
}
