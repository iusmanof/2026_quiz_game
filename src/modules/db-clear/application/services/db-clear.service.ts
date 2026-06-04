import { Injectable } from "@nestjs/common";

@Injectable()
export class DbClearService {
  // constructor(private readonly userRepository: UserRepository) {}
  async deleteAllData() {
    // this.userRepository.deleteAll();
  }
}
