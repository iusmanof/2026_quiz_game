import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    example: 'Question #1 ?',
  })
  @IsString()
  body: string;

  @ApiProperty({
    example: ['a', 'A'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  correctAnswers: string[];
}
