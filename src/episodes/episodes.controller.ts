import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { EpisodesService } from './episodes.service';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../common/guard/auth.guard';
import { RolesGuard } from '../common/guard/roles.guard';
import { AdminRole } from '../common/enum/admin.role';
import { Roles } from '../common/decorator/roles.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('watch-episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) { }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Post()
  create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodesService.create(createEpisodeDto);
  }

  @Roles('PUBLIC')
  @Get()
  findAll() {
    return this.episodesService.findAll();
  }

  @Roles('PUBLIC')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodesService.findOne(+id);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodesService.update(+id, updateEpisodeDto);
  }

  @Roles(AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.episodesService.remove(+id);
  }
}
