import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { configValidationUtility } from "./config-validation.utility";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

export enum Environments {
  DEVELOPMENT = "development",
  STAGING = "staging",
  PRODUCTION = "production",
  TESTING = "testing",
}

@Injectable()
export class CoreConfig {
  constructor(private readonly configService: ConfigService) {
    this.port = Number(this.configService.getOrThrow("PORT"));

    this.node_env = this.configService.getOrThrow<Environments>("NODE_ENV");

    this.url = this.configService.getOrThrow("URL");

    this.includeTestingModule = configValidationUtility.convertToBoolean(
      this.configService.getOrThrow("INCLUDE_TESTING_MODULE"),
    );

    this.sendInternalServerErrorDetails =
      configValidationUtility.convertToBoolean(
        this.configService.getOrThrow("SEND_INTERNAL_SERVER_ERROR_DETAILS"),
      );

    configValidationUtility.validateConfig(this);
  }

  @IsNumber({}, { message: "💎[ENV] set PORT" })
  private readonly port: number;

  @IsEnum(Environments, {
    message:
      "💎[ENV] set NODE_ENV: " +
      configValidationUtility.getEnumValues(Environments).join(", "),
  })
  private readonly node_env: Environments;

  @IsNotEmpty({ message: "💎[ENV] set URL" })
  private readonly url: string;

  @IsBoolean({
    message: "💎[ENV] set INCLUDE_TESTING_MODULE (true/false)",
  })
  private readonly includeTestingModule: boolean;

  @IsBoolean({
    message: "💎[ENV] set SEND_INTERNAL_SERVER_ERROR_DETAILS (true/false)",
  })
  private readonly sendInternalServerErrorDetails: boolean;

  // Getters

  getPort() {
    return this.port;
  }

  getEnv() {
    return this.node_env;
  }

  getUrl() {
    return this.url;
  }

  isProduction() {
    return this.node_env === Environments.PRODUCTION;
  }

  isDevelopment() {
    return this.node_env === Environments.DEVELOPMENT;
  }
}
