import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewPasswordDto {
  @ApiProperty({
    description: 'newPassword',
    minLength: 6,
    maxLength: 20,
  })
  @IsString()
  @Length(6, 20)
  newPassword: string;

  @IsString()
  recoveryCode: string;
}
