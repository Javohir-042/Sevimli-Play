import { PartialType } from '@nestjs/swagger';
import { CreateContentPeopleDto } from './create-content_people.dto';

export class UpdateContentPeopleDto extends PartialType(CreateContentPeopleDto) { }
