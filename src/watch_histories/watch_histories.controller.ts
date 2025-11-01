import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WatchHistoriesService } from './watch_histories.service';
import { CreateWatchHistoryDto } from './dto/create-watch_history.dto';
import { UpdateWatchHistoryDto } from './dto/update-watch_history.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../common/guard/roles.guard';
import { AuthGuard } from '../common/guard/auth.guard';
import { AdminRole } from '../common/enum/admin.role';
import { Roles } from '../common/decorator/roles.decorator';

@ApiTags('Watch Histories')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('watch-histories')
export class WatchHistoriesController {
  constructor(private readonly watchHistoriesService: WatchHistoriesService) {}

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN, AdminRole.USER)
  @Post()
  create(@Body() createWatchHistoryDto: CreateWatchHistoryDto) {
    return this.watchHistoriesService.create(createWatchHistoryDto);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Get()
  findAll() {
    return this.watchHistoriesService.findAll();
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN, AdminRole.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchHistoriesService.findOne(+id);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN, AdminRole.USER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWatchHistoryDto: UpdateWatchHistoryDto) {
    return this.watchHistoriesService.update(+id, updateWatchHistoryDto);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.watchHistoriesService.remove(+id);
  }
}
