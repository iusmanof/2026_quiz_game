import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsString, Length } from 'class-validator';

export class UpdateQuestionDto {
  @ApiProperty({
    example: 'Question update #1 ?',
  })
  @IsString()
  @Length(10, 500)
  body: string;

  @ApiProperty({
    example: ['b', 'B'],
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  correctAnswers: string[];
}
