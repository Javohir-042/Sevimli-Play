import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../common/guard/roles.guard';
import { AuthGuard } from '../common/guard/auth.guard';
import { AdminRole } from '../common/enum/admin.role';
import { Roles } from '../common/decorator/roles.decorator';


@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN, AdminRole.USER)
  @Post()
  create(@Body() createPeopleDto: CreatePeopleDto) {
    return this.peopleService.create(createPeopleDto);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN, AdminRole.USER)
  @Get()
  findAll() {
    return this.peopleService.findAll();
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN, AdminRole.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(+id);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeopleDto: UpdatePeopleDto) {
    return this.peopleService.update(+id, updatePeopleDto);
  }

  @Roles(AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(+id);
  }
}
