import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

@Controller("auth")
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get("login")
  @HttpCode(HttpStatus.OK)
  login() {
    return "login";
  }

  @Get("logout")
  @HttpCode(HttpStatus.OK)
  logout() {
    return "logout";
  }
}
