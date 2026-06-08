import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @ApiProperty({
    example: 'Question update #1 ?',
  })
  @IsString()
  body: string;

  @ApiProperty({
    example: ['b', 'B'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  correctAnswers: string[];
}
