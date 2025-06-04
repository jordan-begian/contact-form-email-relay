import { router } from '@/backend/routes/index';
import config from '@/shared/utils/ConfigHelper';
import { globalErrorHandler } from '@/backend/utils/ErrorHandler';
import {
  logger,
  requestLogger,
  requestTracer
} from '@/shared/utils/LoggerConfig';
import cors from 'cors';
import express, { Express } from 'express';

const ALLOWED_ORIGINS: string[] = config.cors.ALLOWED_ORIGINS;
const PORT: number = config.PORT;
const app: Express = express();

app.use(
  requestTracer,
  requestLogger
);

app.use(
  express.json(),
  cors({ origin: ALLOWED_ORIGINS }),
  router
);

app.use(globalErrorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
██████╗ ███████╗██╗      █████╗ ██╗   ██╗     █████╗ ██████╗ ██╗
██╔══██╗██╔════╝██║     ██╔══██╗╚██╗ ██╔╝    ██╔══██╗██╔══██╗██║
██████╔╝█████╗  ██║     ███████║ ╚████╔╝     ███████║██████╔╝██║
██╔══██╗██╔══╝  ██║     ██╔══██║  ╚██╔╝      ██╔══██║██╔═══╝ ██║
██║  ██║███████╗███████╗██║  ██║   ██║       ██║  ██║██║     ██║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝     ╚═╝
----------------------------------------------------------------
    `);
  logger.info(`Server is running on port ${PORT}`);
});
