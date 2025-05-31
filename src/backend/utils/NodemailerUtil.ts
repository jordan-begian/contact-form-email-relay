import { Message } from '@/backend/models/RelayModels';
import config from '@/shared/utils/ConfigHelper';
import { logger } from '@/shared/utils/LoggerConfig';
import { StatusCodes } from 'http-status-codes';
import { catchError, defer, Observable, switchMap, tap } from 'rxjs';
import { buildRelayAPIError } from './ErrorHandler';

const GMAIL_ACCOUNT = process.env.GOOGLE_USER_ACCOUNT as string;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN as string;
const DESTINATION_EMAIL = process.env.DESTINATION_EMAIL as string;

const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: GMAIL_ACCOUNT,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
  },
});

const mailer = {
  sendEmail: async (subject: string, body: string) => {
    const options: SendMailOptions = {
      from: GMAIL_ACCOUNT,
      to: DESTINATION_EMAIL,
      subject: subject,
      // TODO: Update to use HTML rich text format
      text: body,
    };

    await transporter.sendMail(options);
  }
};

export default mailer;
