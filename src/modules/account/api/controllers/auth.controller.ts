import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegistrationDataDto } from "../dto/registration-data.dto";
import {RegistrationCommand} from "../../application/commands/registration.command";

@Controller("auth")
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("registration")
  @HttpCode(HttpStatus.NO_CONTENT)
  async registration(@Body() body: RegistrationDataDto): Promise<void> {
    return this.commandBus.execute(new RegistrationCommand(body));
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  login() {
    return "login";
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout() {
    return "logout";
  }
}
