import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ThumbnailsService } from './thumbnails.service';
import { CreateThumbnailDto } from './dto/create-thumbnail.dto';
import { UpdateThumbnailDto } from './dto/update-thumbnail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../common/guard/roles.guard';
import { AuthGuard } from '../common/guard/auth.guard';
import { AdminRole } from '../common/enum/admin.role';
import { Roles } from '../common/decorator/roles.decorator';

@ApiTags('Thumbnails')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('thumbnails')
export class ThumbnailsController {
  constructor(private readonly thumbnailsService: ThumbnailsService) {}

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Post()
  create(@Body() createThumbnailDto: CreateThumbnailDto) {
    return this.thumbnailsService.create(createThumbnailDto);
  }

  @Roles('PUBLIC')
  @Get()
  findAll() {
    return this.thumbnailsService.findAll();
  }

  @Roles('PUBLIC')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thumbnailsService.findOne(+id);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThumbnailDto: UpdateThumbnailDto) {
    return this.thumbnailsService.update(+id, updateThumbnailDto);
  }

  @Roles(AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.thumbnailsService.remove(+id);
  }
}
