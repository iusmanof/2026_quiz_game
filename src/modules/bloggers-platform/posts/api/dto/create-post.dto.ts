import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Trim } from '@core/decorators/transform/trim';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post title',
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
    description: 'Short post description',
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
    description: 'Post content',
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

  @ApiProperty({
    description: 'Blog identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  blogId: string;
}
