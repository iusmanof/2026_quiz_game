import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

@Controller("pair-game-quiz/pairs")
export class PairGameController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get("my-current")
  @HttpCode(HttpStatus.OK)
  currentUnfinishedUserGame() {
    return "my-current";
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  getId(@Param("id") id: string) {
    return `id: ${id}`;
  }

  @Post("pairs/connection")
  @HttpCode(HttpStatus.OK)
  connectCurrentUser(@Body() dto: string) {
    return `dto: ${dto}`;
  }

  @Post("my-current/answers")
  @HttpCode(HttpStatus.OK)
  sendAnswer(@Body() answer: string) {
    return `answer: ${answer}`;
  }
}
