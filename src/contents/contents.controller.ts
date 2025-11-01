import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminRole } from '../common/enum/admin.role';
import { Roles } from '../common/decorator/roles.decorator';
import { RolesGuard } from '../common/guard/roles.guard';
import { AuthGuard } from '../common/guard/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentsService.create(createContentDto);
  }

  @Roles('PUBLIC')
  @Get()
  findAll() {
    return this.contentsService.findAll();
  }

  @Roles('PUBLIC')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentsService.findOne(+id);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentsService.update(+id, updateContentDto);
  }

  @Roles(AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentsService.remove(+id);
  }
}
