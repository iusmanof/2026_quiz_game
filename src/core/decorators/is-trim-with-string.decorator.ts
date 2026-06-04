import { applyDecorators } from "@nestjs/common";
import { IsString, Length } from "class-validator";
import { Transform } from "class-transformer";

export const Trim = () => {
  return Transform(({ value }: { value: unknown }) => {
    if (typeof value === "string") {
      return value.trim();
    }
    return value;
  });
};

export const IsStringWithTrim = (minLength: number, maxLength: number) => {
  return applyDecorators(IsString(), Length(minLength, maxLength), Trim());
};
