import { logger } from '@/shared/utils/LoggerConfig';
import fs from 'fs';

const ORIGINS_FILE_PATH = process.env.ORIGINS_FILE_PATH as string;
const getAllowedOrigins = (path: string): string[] => {
  const origins: string[] = fs.existsSync(path)
    ? JSON.parse(fs.readFileSync(path, 'utf-8'))
    : [];
  if (origins.length === 0) {
    console.error('Error: No origins found in the configuration file.');
    process.exit(1);
  }

  logger.info({
    message: 'CORS allowed origins loaded from file',
    file: path,
  });
  return origins;
};

const config = {
  PORT: parseInt(process.env.PORT as string),
  cors: {
    ALLOWED_ORIGINS: getAllowedOrigins(ORIGINS_FILE_PATH),
  },
  nodemailer: {
    GMAIL_ACCOUNT: process.env.GOOGLE_USER_ACCOUNT as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN as string,
    DESTINATION_EMAIL: process.env.DESTINATION_EMAIL as string,
  }
};

export default config;
