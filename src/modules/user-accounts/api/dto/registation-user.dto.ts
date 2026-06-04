import { IsStringWithTrim } from '@core/decorators/validation/is-string-with-trim';
import { loginConstraints, passwordConstraints } from './create-user.dto';
import { IsEmail, IsString, Length } from 'class-validator';
import { Trim } from '@core/decorators/transform/trim';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationUserInputDto {
  @ApiProperty()
  @IsStringWithTrim(loginConstraints.minLength, loginConstraints.maxLength)
  login: string;

  @ApiProperty()
  @IsString()
  @Length(passwordConstraints.minLength, passwordConstraints.maxLength)
  @Trim()
  password: string;
  @ApiProperty()
  @IsString()
  @IsEmail()
  @Trim()
  email: string;
}
