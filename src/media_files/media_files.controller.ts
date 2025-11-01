import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MediaFilesService } from './media_files.service';
import { CreateMediaFileDto } from './dto/create-media_file.dto';
import { UpdateMediaFileDto } from './dto/update-media_file.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../common/guard/roles.guard';
import { AuthGuard } from '../common/guard/auth.guard';
import { AdminRole } from '../common/enum/admin.role';
import { Roles } from '../common/decorator/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('media-files')
export class MediaFilesController {
  constructor(private readonly mediaFilesService: MediaFilesService) {}

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Post()
  create(@Body() createMediaFileDto: CreateMediaFileDto) {
    return this.mediaFilesService.create(createMediaFileDto);
  }

  @Roles('PUBLIC')
  @Get()
  findAll() {
    return this.mediaFilesService.findAll();
  }

  @Roles('PUBLIC')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaFilesService.findOne(+id);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaFileDto: UpdateMediaFileDto) {
    return this.mediaFilesService.update(+id, updateMediaFileDto);
  }

  @Roles(AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaFilesService.remove(+id);
  }
}
