import { IsString, Length, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const loginConstraints = {
  minLength: 3,
  maxLength: 10,
};

export const passwordConstraints = {
  minLength: 6,
  maxLength: 20,
};

export class CreateUserDto {
  @ApiProperty({
    description: 'login',
    minLength: 3,
    maxLength: 10,
    example: 'admin',
  })
  @IsString()
  @Length(3, 10)
  login: string;

  @ApiProperty({
    description: 'password',
    minLength: 6,
    maxLength: 20,
    example: 'qwerty123',
  })
  @IsString()
  @Length(6, 20)
  password: string;

  @ApiProperty({
    description: 'email',
    example: 'test@mail.com',
  })
  @IsString()
  @IsEmail()
  email: string;
}
