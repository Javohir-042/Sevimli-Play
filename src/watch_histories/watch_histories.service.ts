import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWatchHistoryDto } from './dto/create-watch_history.dto';
import { UpdateWatchHistoryDto } from './dto/update-watch_history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WatchHistory } from './entities/watch_history.entity';
import { Repository } from 'typeorm';
import { Profile } from '../profiles/entities/profile.entity';
import { Content } from '../contents/entities/content.entity';
import { Episode } from '../episodes/entities/episode.entity';

@Injectable()
export class WatchHistoriesService {
  constructor(
    @InjectRepository(WatchHistory) private readonly watchHistoryRepo: Repository<WatchHistory>,
    @InjectRepository(Profile) private readonly profileRepo: Repository<Profile>,
    @InjectRepository(Content) private readonly contentRepo: Repository<Content>,
    @InjectRepository(Episode) private readonly episodeRepo: Repository<Episode>,
  ) { }

  async create(createWatchHistoryDto: CreateWatchHistoryDto) {
    const { profile_id, content_id, episode_id } = createWatchHistoryDto;

    const profile = await this.profileRepo.findOne({ where: { id: profile_id } })
    if (!profile) {
      throw new NotFoundException("Profile not found")
    }

    const content = await this.contentRepo.findOne({ where: { id: content_id } })
    if (!content) {
      throw new NotFoundException("Content not found")
    }

    const episode = await this.episodeRepo.findOne({ where: { id: episode_id } })
    if (!episode) {
      throw new NotFoundException("Episode not found")
    }

    const watch_episodes = this.watchHistoryRepo.create({ ...createWatchHistoryDto, profile, content, episode })

    return this.watchHistoryRepo.save(watch_episodes);
  }

  findAll() {
    return this.watchHistoryRepo.find({ relations: ['profile', 'content', 'episode'], order: { id: 'ASC' } })
  }

  async findOne(id: number) {
    const watch_episodes = await this.watchHistoryRepo.findOne({ where: { id }, relations: ['profile', 'content', 'episode'] })
    if (!watch_episodes) {
      throw new NotFoundException("watchEpisode id not found")
    }

    return watch_episodes;
  }

  async update(id: number, updateWatchHistoryDto: UpdateWatchHistoryDto) {
    const watch_episodes = await this.watchHistoryRepo.findOneBy({ id })
    if (!watch_episodes) {
      throw new NotFoundException("WatchEpisode id not found")
    }

    const { profile_id, content_id, episode_id, ...rest } = updateWatchHistoryDto;

    if (profile_id) {
      const profile = await this.profileRepo.findOne({ where: { id: profile_id } })
      if (!profile) {
        throw new NotFoundException("Profile id not found")
      }

      watch_episodes.profile = profile;
    }

    if (content_id) {
      const content = await this.contentRepo.findOne({ where: { id: content_id } })
      if (!content) {
        throw new NotFoundException("content id not found")
      }

      watch_episodes.content = content;
    }

    if (episode_id) {
      const episode = await this.episodeRepo.findOne({ where: { id: episode_id } })
      if (!episode) {
        throw new NotFoundException("episode id not found")
      }

      watch_episodes.episode = episode;
    }

    Object.assign(watch_episodes, rest)

    return this.watchHistoryRepo.save(watch_episodes);
  }

  async remove(id: number) {
    const watch_episodes = await this.watchHistoryRepo.delete({ id })
    if (watch_episodes.affected === 0) {
      throw new NotFoundException('WatchHistories id not found')
    }

    return { message: `id o'chirildi` }
  }
}
