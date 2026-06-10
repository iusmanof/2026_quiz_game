import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsString, Length } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    example: 'Question #1 ?',
  })
  @IsString()
  @Length(10, 500)
  body: string;

  @ApiProperty({
    example: ['a', 'A'],
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  correctAnswers: string[];
}
