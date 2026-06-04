import { Controller, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { DbClearService } from "../../application/services/db-clear.service";

@Controller("testing")
export class DbClearController {
  constructor(private readonly dbClearService: DbClearService) {}

  @Delete("/all-data")
  @HttpCode(HttpStatus.NO_CONTENT)
  async clearDatabase(): Promise<void> {
    await this.dbClearService.deleteAllData();
    return;
  }
}
