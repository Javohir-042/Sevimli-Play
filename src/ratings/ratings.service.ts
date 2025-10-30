import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';
import { Content } from '../contents/entities/content.entity';
import { Profile } from '../profiles/entities/profile.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating) private readonly ratingRepo: Repository<Rating>,
    @InjectRepository(Content) private readonly contentRepo: Repository<Content>,
    @InjectRepository(Profile) private readonly profileRepo: Repository<Profile>,

  ) { }

   async create(createRatingDto: CreateRatingDto) {
      const { content_id, profile_id } = createRatingDto;
  
      const content = await this.contentRepo.findOne({ where: { id: content_id } })
      if (!content) {
        throw new NotFoundException("Content not found")
      }
  
      const profile = await this.profileRepo.findOne({ where: { id: profile_id } })
      if (!profile) {
        throw new NotFoundException("profile not found")
      }
  
      const rating = this.ratingRepo.create({ ...createRatingDto, content, profile })
  
      return this.ratingRepo.save(createRatingDto)
    }
  
    findAll() {
      return this.ratingRepo.find({ relations: ['content', 'profile'], order: { id: 'ASC' } })
    }
  
    async findOne(id: number) {
      const rating = await this.ratingRepo.findOne({ where: { id }, relations: ['content', 'profile'] })
      if (!rating) {
        throw new NotFoundException("Bunday id mavjud emas")
      }
  
      return rating;
    }
  
    async update(id: number, updateRatingDto: UpdateRatingDto) {
      const rating = await this.ratingRepo.findOneBy({ id })
      if (!rating) {
        throw new NotFoundException("rating not found")
      }
  
      const { content_id, profile_id, ...rest } = updateRatingDto;
  
      if (content_id) {
        const content = await this.contentRepo.findOne({ where: { id: content_id } })
        if(!content){
          throw new NotFoundException("Content id not found")
        }
  
        rating.content = content;
      }
  
      if (profile_id) {
        const profile = await this.profileRepo.findOne({ where: { id: profile_id } })
        if (!profile) {
          throw new NotFoundException("profile id not found")
        }
  
        rating.profile = profile;
      }
  
      Object.assign(rating, rest)
  
      return this.ratingRepo.save(rating)
    }
  
    async remove(id: number) {
      const rating = await this.ratingRepo.delete({ id });
      if (rating.affected === 0) {
        throw new NotFoundException('rating not found')
      }
      return { message: "id o'chirildi" }
    }
}
