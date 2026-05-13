// import { TypeOrmModuleOptions } from "@nestjs/typeorm";
// import { ConfigFactory } from "@nestjs/config";
//
// export interface DatabaseConfig {
//   database: Partial<TypeOrmModuleOptions>;
// }
//
// const DatabaseConfiguration: ConfigFactory = () => ({
//   database: {
//     type: "postgres",
//     url: process.env.DATABASE_URL,
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     logging: ["query", "error", "schema", "warn"],
//     synchronize: false,
//   },
// });
//
// export default DatabaseConfiguration;

import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const databaseConfig = registerAs(
  "database",
  (): TypeOrmModuleOptions => {
    const required = (value: string | undefined, name: string) => {
      if (!value) {
        throw new Error(`❌ Missing env variable: ${name}`);
      }
      return value;
    };

    return {
      type: "postgres",

      host: required(process.env.DB_HOST, "DB_HOST"),
      port: Number(required(process.env.DB_PORT, "DB_PORT")),
      username: required(process.env.DB_USER, "DB_USER"),
      password: required(process.env.DB_PASSWORD, "DB_PASSWORD"),
      database: required(process.env.DB_NAME, "DB_NAME"),

      logging: process.env.NODE_ENV !== "production",
      synchronize: process.env.NODE_ENV !== "production",

      autoLoadEntities: true,
    };
  },
);
