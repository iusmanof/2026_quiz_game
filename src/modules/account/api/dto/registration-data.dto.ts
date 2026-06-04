import {
  IsStringWithTrim,
  Trim,
} from "../../../../core/decorators/is-trim-with-string.decorator";
import { IsString, Length } from "class-validator";

export const loginConstraints = {
  minLength: 3,
  maxLength: 10,
};

export const passwordConstraints = {
  minLength: 6,
  maxLength: 20,
};

export class RegistrationDataDto {
  @IsStringWithTrim(loginConstraints.minLength, loginConstraints.maxLength)
  login: string;

  @IsString()
  @Length(passwordConstraints.minLength, passwordConstraints.maxLength)
  @Trim()
  password: string;
}
