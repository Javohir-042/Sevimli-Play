import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContentTagsService } from './content-tags.service';
import { CreateContentTagDto } from './dto/create-content-tag.dto';
import { UpdateContentTagDto } from './dto/update-content-tag.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminRole } from '../common/enum/admin.role';
import { Roles } from '../common/decorator/roles.decorator';
import { RolesGuard } from '../common/guard/roles.guard';
import { AuthGuard } from '../common/guard/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('content-tags')
export class ContentTagsController {
  constructor(private readonly contentTagsService: ContentTagsService) {}

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Post()
  create(@Body() createContentTagDto: CreateContentTagDto) {
    return this.contentTagsService.create(createContentTagDto);
  }

  @Roles('PUBLIC')
  @Get()
  findAll() {
    return this.contentTagsService.findAll();
  }

  @Roles('PUBLIC')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentTagsService.findOne(+id);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentTagDto: UpdateContentTagDto) {
    return this.contentTagsService.update(+id, updateContentTagDto);
  }

  @Roles(AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentTagsService.remove(+id);
  }
}
