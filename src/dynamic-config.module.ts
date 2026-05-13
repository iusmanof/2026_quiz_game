import { join } from "path";
import { ConfigModule } from "@nestjs/config";

const envFilePaths = [
  join(process.cwd(), "src", "env", `.env.${process.env.NODE_ENV}.local`),
  join(process.cwd(), "src", "env", `.env.${process.env.NODE_ENV}`),
  join(process.cwd(), "src", "env", `.env.production`),
];

const DynamicEnvConfigureModule = ConfigModule.forRoot({
  envFilePath: envFilePaths,
  isGlobal: true,
});

export default DynamicEnvConfigureModule;
