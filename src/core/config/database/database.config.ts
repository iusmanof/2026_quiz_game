import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigFactory } from "@nestjs/config";

export interface DatabaseConfig {
  database: Partial<TypeOrmModuleOptions>;
}

const DatabaseConfiguration: ConfigFactory = () => ({
  database: {
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: ["query", "error", "schema", "warn"],
    synchronize: false,
  },
});

export default DatabaseConfiguration;
