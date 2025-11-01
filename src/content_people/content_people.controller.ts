import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContentPeopleService } from './content_people.service';
import { UpdateContentPeopleDto } from './dto/update-content_people.dto';
import { CreateContentPeopleDto } from './dto/create-content_people.dto';
import { AdminRole } from '../common/enum/admin.role';
import { Roles } from '../common/decorator/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../common/guard/roles.guard';
import { AuthGuard } from '../common/guard/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('content-people')
export class ContentPeopleController {
  constructor(private readonly contentPeopleService: ContentPeopleService) { }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Post()
  create(@Body() createContentPeopleDto: CreateContentPeopleDto) {
    return this.contentPeopleService.create(createContentPeopleDto);
  }

  @Roles('PUBLIC')
  @Get()
  findAll() {
    return this.contentPeopleService.findAll();
  }

  @Roles('PUBLIC')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentPeopleService.findOne(+id);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentPeopleDto: UpdateContentPeopleDto) {
    return this.contentPeopleService.update(+id, updateContentPeopleDto);
  }

  @Roles(AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentPeopleService.remove(+id);
  }
}
