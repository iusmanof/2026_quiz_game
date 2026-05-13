import { join } from "path";

export const getEnvPath = () => {
  const nodeEnv = process.env.NODE_ENV || "development";

  const basePath = join(process.cwd(), "env");

  const envFiles = {
    development: join(basePath, ".env.development"),
    staging: join(basePath, ".env.staging"),
    production: join(basePath, ".env.production"),
  };

    console.log('🔥 ENV PATHS:', envFiles);


  return [envFiles[nodeEnv] || envFiles.development, join(basePath, ".env")];
};
