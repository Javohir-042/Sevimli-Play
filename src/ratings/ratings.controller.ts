import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../common/guard/roles.guard';
import { AuthGuard } from '../common/guard/auth.guard';
import { AdminRole } from '../common/enum/admin.role';
import { Roles } from '../common/decorator/roles.decorator';

@ApiTags('Ratings')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN, AdminRole.USER)
  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(createRatingDto);
  }

  @Roles('PUBLIC')
  @Get()
  findAll() {
    return this.ratingsService.findAll();
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN, AdminRole.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(+id);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN, AdminRole.USER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(+id, updateRatingDto);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingsService.remove(+id);
  }
}
