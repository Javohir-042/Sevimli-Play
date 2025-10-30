import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepo.create({ ...createCategoryDto })

    return this.categoryRepo.save(category)
  }

  findAll() {
    return this.categoryRepo.find({ order: { id: 'ASC' } })
  }

  async findOne(id: number) {
    const categorys = await this.categoryRepo.findOne({ where: { id } })
    if (!categorys) {
      throw new NotFoundException("categorys id not found")
    }

    return categorys;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categorys = await this.categoryRepo.findOneBy({ id })
    if (!categorys) {
      throw new NotFoundException("categorys id not found")
    }

    Object.assign(categorys, updateCategoryDto);

    return this.categoryRepo.save(categorys);
  }

  async remove(id: number) {
    const categorys = await this.categoryRepo.delete({ id })
    if (categorys.affected === 0) {
      throw new NotFoundException("categorys not found")
    }
    return { message: "id o'chirildi" }
  }
}
