import { Module } from '@nestjs/common';
import { MediaFilesService } from './media_files.service';
import { MediaFilesController } from './media_files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaFile } from './entities/media_file.entity';
import { Content } from '../contents/entities/content.entity';
import { Episode } from '../episodes/entities/episode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaFile, Content, Episode])],
  controllers: [MediaFilesController],
  providers: [MediaFilesService],
})
export class MediaFilesModule {}
