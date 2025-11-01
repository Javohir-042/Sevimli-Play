import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AdminRole } from '../common/enum/admin.role';
import { Roles } from '../common/decorator/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../common/guard/roles.guard';
import { AuthGuard } from '../common/guard/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN, AdminRole.USER)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Roles('PUBLIC')
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Roles('PUBLIC')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Roles(AdminRole.ADMIN, AdminRole.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
