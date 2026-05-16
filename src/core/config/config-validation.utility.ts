import { validateSync } from "class-validator";

export const configValidationUtility = {
  validateConfig: (config: object) => {
    const errors = validateSync(config, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(
        errors
          .map((error) => Object.values(error.constraints || {}).join(", "))
          .join("\n"),
      );
    }
  },

  convertToBoolean: (value: string | boolean): boolean => {
    if (typeof value === "boolean") {
      return value;
    }

    return ["true", "1", "yes"].includes(value.toLowerCase());
  },

  getEnumValues: (enumObj: object) => {
    return Object.values(enumObj);
  },
};
