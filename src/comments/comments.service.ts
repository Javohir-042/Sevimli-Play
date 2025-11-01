import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Content } from '../contents/entities/content.entity';
import { Episode } from '../episodes/entities/episode.entity';
import { Profile } from '../profiles/entities/profile.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Content) private readonly contentRepo: Repository<Content>,
    @InjectRepository(Episode) private readonly episodeRepo: Repository<Episode>,
    @InjectRepository(Profile) private readonly profileRepo: Repository<Profile>,
  ) { }

  async create(createCommentDto: CreateCommentDto) {
    const { content_id, episode_id, profile_id } = createCommentDto;

    const content = await this.contentRepo.findOne({ where: { id: content_id } })
    if (!content) {
      throw new NotFoundException('Content id not found')
    }

    const episode = await this.episodeRepo.findOne({ where: { id: episode_id } })
    if (!episode) {
      throw new NotFoundException('episode id not found')
    }

    const profile = await this.profileRepo.findOne({ where: { id: profile_id } })
    if (!profile) {
      throw new NotFoundException('profile id not found')
    }

    const comment = this.commentRepo.create({ ...createCommentDto, content, episode, profile })

    return this.commentRepo.save(comment)
  }

  findAll() {
    return this.commentRepo.find({ relations: ['content', 'episode', 'profile'], order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const comment = await this.commentRepo.findOne({ where: { id }, relations: ['content', 'episode', 'profile'] })
    if (!comment) {
      throw new NotFoundException("Comment id not found")
    }

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepo.findOneBy({ id })
    if (!comment) {
      throw new NotFoundException('Comment id not found')
    }

    const { content_id, episode_id, profile_id, ...rest } = updateCommentDto

    if (content_id) {
      const content = await this.contentRepo.findOne({ where: { id: content_id } })
      if (!content) {
        throw new NotFoundException("Content id not found")
      }

      comment.content = content
    }

    if (episode_id) {
      const episode = await this.episodeRepo.findOne({ where: { id: episode_id } })
      if (!episode) {
        throw new NotFoundException("episode id not found")
      }

      comment.episode = episode
    }


    if (profile_id) {
      const profile = await this.profileRepo.findOne({ where: { id: profile_id } })
      if (!profile) {
        throw new NotFoundException("profile id not found")
      }

      comment.profile = profile
    }

    Object.assign(comment, rest)

    return this.commentRepo.save(comment);
  }

  async remove(id: number) {
    const comment = await this.commentRepo.delete({ id })
    if (comment.affected === 0) {
      throw new NotFoundException('Comment id not found')
    }

    return { message: `id o'chirildi` }
  }
}
