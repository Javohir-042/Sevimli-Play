import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContentCategoriesService } from './content-categories.service';
import { CreateContentCategoryDto } from './dto/create-content-category.dto';
import { UpdateContentCategoryDto } from './dto/update-content-category.dto';
import { AdminRole } from '../common/enum/admin.role';
import { Roles } from '../common/decorator/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../common/guard/roles.guard';
import { AuthGuard } from '../common/guard/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('content-categories')
export class ContentCategoriesController {
  constructor(private readonly contentCategoriesService: ContentCategoriesService) {}

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Post()
  create(@Body() createContentCategoryDto: CreateContentCategoryDto) {
    return this.contentCategoriesService.create(createContentCategoryDto);
  }

  @Roles('PUBLIC')
  @Get()
  findAll() {
    return this.contentCategoriesService.findAll();
  }

  @Roles('PUBLIC')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentCategoriesService.findOne(+id);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentCategoryDto: UpdateContentCategoryDto) {
    return this.contentCategoriesService.update(+id, updateContentCategoryDto);
  }

  @Roles( AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentCategoriesService.remove(+id);
  }
}
