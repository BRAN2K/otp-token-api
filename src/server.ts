import { env } from "@/config/env";
import { logger } from "@/config/logger";
import { createApp } from "./app";

const app = createApp();

app.listen(env.PORT, () => {
  logger.info(`Server running at ${env.HOST}:${env.PORT}`);
  logger.info(`Environment: ${env.NODE_ENV}`);
});
