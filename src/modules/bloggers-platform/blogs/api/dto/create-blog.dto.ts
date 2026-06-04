import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Trim } from '@core/decorators/transform/trim';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({
    minLength: 1,
    maxLength: 15,
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  @Length(1, 15)
  name: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 500,
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  description: string;

  @ApiProperty({
    example: 'https://myblog.com',
    maxLength: 100,
  })
  @Trim()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Matches(/^https:\/\/.+/, {
    message: 'websiteUrl must be a valid URL',
  })
  websiteUrl: string;
}
