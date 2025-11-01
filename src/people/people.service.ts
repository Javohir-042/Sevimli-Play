import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { People } from './entities/people.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private readonly peopleRepo: Repository<People>,
  ) { }

  async create(createPeopleDto: CreatePeopleDto) {
    if (!createPeopleDto.birth_date) {
      createPeopleDto.birth_date = new Date(); // hozirgi vaqt
    }
    const newPerson = this.peopleRepo.create(createPeopleDto);
    return this.peopleRepo.save(newPerson);
  }


  async findAll() {
    return this.peopleRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const person = await this.peopleRepo.findOne({ where: { id } });
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    return person;
  }

  async update(id: number, updatePeopleDto: UpdatePeopleDto) {
    const person = await this.peopleRepo.findOne({ where: { id } });
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }

    Object.assign(person, updatePeopleDto);
    return this.peopleRepo.save(person);
  }

  async remove(id: number) {
    const result = await this.peopleRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    return { message: `id o'chirildi` };
  }
}
