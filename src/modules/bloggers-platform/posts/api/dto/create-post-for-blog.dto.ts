import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Trim } from '@core/decorators/transform/trim';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostForBlogDto {
  @ApiProperty({
    example: 'Introduction to NestJS',
    minLength: 1,
    maxLength: 30,
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  title: string;

  @ApiProperty({
    example: 'A brief overview of the NestJS framework',
    minLength: 1,
    maxLength: 100,
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  shortDescription: string;

  @ApiProperty({
    example:
      'NestJS is a progressive Node.js framework for building scalable server-side applications...',
    minLength: 1,
    maxLength: 1000,
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  content: string;
}
