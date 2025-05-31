import fs from 'fs';

const ORIGINS_FILE_PATH = process.env.ORIGINS_FILE_PATH as string;
const config = {
  getAllowedOrigins: (): string[] => {
    const origins: string[] = fs.existsSync(ORIGINS_FILE_PATH)
      ? JSON.parse(fs.readFileSync(ORIGINS_FILE_PATH, 'utf-8'))
      : [];
    if (origins.length === 0) {
      console.error('Error: No origins found in the configuration file.');
      process.exit(1);
    }

    console.info({
      message: 'CORS allowed origins loaded from file', 
      file: ORIGINS_FILE_PATH,
      timestamp: new Date().toLocaleString('sv-SE').replace(' ', 'T'),
    });
    return origins;
  }
};

export default config;
