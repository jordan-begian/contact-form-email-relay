import express, { Express } from 'express';
import cors from 'cors';
import config from '@/shared/utils/ConfigHelper';
import router from '@/backend/routes/index';

const ALLOWED_ORIGINS: string[] = config.getAllowedOrigins();
const PORT: number = parseInt(process.env.PORT as string);
const app: Express = express();


app.use(
  cors({ origin: ALLOWED_ORIGINS }),
  express.json(),
  router
);

app.listen(PORT, () => {
  console.log({
    message: `Server is running on port ${PORT}`,
    timestamp: new Date().toLocaleString('sv-SE').replace(' ', 'T'),
  });
});
