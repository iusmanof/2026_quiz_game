import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class PublishedQuestionDto {
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  published: boolean;
}
