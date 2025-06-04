import { Message } from '@/backend/models/RelayModels';
import config from '@/shared/utils/ConfigHelper';
import { logger } from '@/shared/utils/LoggerConfig';
import { StatusCodes } from 'http-status-codes';
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import { catchError, defer, Observable, switchMap, tap } from 'rxjs';
import { buildRelayAPIError } from './ErrorHandler';

const GMAIL_ACCOUNT = config.nodemailer.GMAIL_ACCOUNT;
const CLIENT_ID = config.nodemailer.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = config.nodemailer.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = config.nodemailer.GOOGLE_REFRESH_TOKEN;
const DESTINATION_EMAIL = config.nodemailer.DESTINATION_EMAIL;

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
  sendEmail: (message: Observable<Message>): Observable<void> => {
    return message.pipe(
      switchMap((message: Message) =>
        defer(async () => {
          const options: SendMailOptions = {
            from: GMAIL_ACCOUNT,
            to: DESTINATION_EMAIL,
            subject: message.subject,
            // TODO: Update to use HTML rich text format
            text: message.body,
          };
          await transporter.sendMail(options);
        })
        .pipe(
          tap(() => logger.info({
            message: 'Email sent successfully via Nodemailer',
          })),
          catchError((error) => {
            logger.error({
              message: 'Error sending email via Nodemailer',
              error: error.message,
              raw: error.toString(),
            });
            throw buildRelayAPIError(
              new Error('Failed to send email via Nodemailer'),
              StatusCodes.INTERNAL_SERVER_ERROR
            );
          }),
        )
      )
    )
  }
};

export default mailer;
