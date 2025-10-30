import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentCategoryDto } from './dto/create-content-category.dto';
import { UpdateContentCategoryDto } from './dto/update-content-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentCategory } from './entities/content-category.entity';
import { Repository } from 'typeorm';
import { Content } from '../contents/entities/content.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ContentCategoriesService {
  constructor(
    @InjectRepository(ContentCategory) private readonly contentCategoryRepo: Repository<ContentCategory>,
    @InjectRepository(Content) private readonly contentRepo: Repository<Content>,
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
  ) { }

  async create(createContentCategoryDto: CreateContentCategoryDto) {
    const { content_id, category_id } = createContentCategoryDto;

    const content = await this.contentRepo.findOne({ where: { id: content_id } })
    if (!content) {
      throw new NotFoundException("Content not found")
    }

    const category = await this.categoryRepo.findOne({ where: { id: category_id } })
    if (!category) {
      throw new NotFoundException("Category not found")
    }

    const contentCategory = this.contentCategoryRepo.create({ ...createContentCategoryDto, content, category })

    return this.contentCategoryRepo.save(contentCategory)
  }

  findAll() {
    return this.contentCategoryRepo.find({ relations: ['content', 'category'], order: { id: 'ASC' } })
  }

  async findOne(id: number) {
    const contentCategories = await this.contentCategoryRepo.findOne({ where: { id }, relations: ['content', 'category'] })
    if (!contentCategories) {
      throw new NotFoundException("Bunday id mavjud emas")
    }

    return contentCategories;
  }

  async update(id: number, updateContentCategoryDto: UpdateContentCategoryDto) {
    const contentCategories = await this.contentCategoryRepo.findOneBy({ id })
    if (!contentCategories) {
      throw new NotFoundException("ContentCategories not found")
    }

    const { content_id, category_id, ...rest } = updateContentCategoryDto;

    if (content_id) {
      const content = await this.contentRepo.findOne({ where: { id: content_id } })
      if(!content){
        throw new NotFoundException("Content id not found")
      }

      contentCategories.content = content;
    }

    if (category_id) {
      const category = await this.categoryRepo.findOne({ where: { id: category_id } })
      if (!category) {
        throw new NotFoundException("Category id not found")
      }

      contentCategories.category = category;
    }

    Object.assign(contentCategories, rest)

    return this.contentCategoryRepo.save(contentCategories)
  }

  async remove(id: number) {
    const contentCategories = await this.contentCategoryRepo.delete({ id });
    if (contentCategories.affected === 0) {
      throw new NotFoundException('contentCategories not found')
    }
    return { message: "id o'chirildi" }
  }
}
