import { join } from "path";
import { ConfigModule } from "@nestjs/config";

const envFilePaths = [
  process.env.ENV_FILE_PATH?.trim() || "",
  join(__dirname, `env`, `.env.${process.env.ENV_NODE_ENV}.local`),
  // TODO env
];

const DynamicConfigeModule = ConfigModule.forRoot({
  envFilePath: envFilePaths,
  isGlobal: true,
});

export default DynamicConfigeModule;
