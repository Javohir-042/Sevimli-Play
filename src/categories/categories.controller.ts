import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../common/guard/roles.guard';
import { AuthGuard } from '../common/guard/auth.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { AdminRole } from '../common/enum/admin.role';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Roles(AdminRole.SUPERADMIN, AdminRole.ADMIN,)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Roles('PUBLIC')
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Roles('PUBLIC')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Roles(AdminRole.SUPERADMIN, AdminRole.ADMIN,)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Roles(AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
