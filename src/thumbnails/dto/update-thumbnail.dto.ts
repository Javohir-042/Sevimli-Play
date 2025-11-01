import { PartialType } from '@nestjs/swagger';
import { CreateThumbnailDto } from './create-thumbnail.dto';

export class UpdateThumbnailDto extends PartialType(CreateThumbnailDto) {}
