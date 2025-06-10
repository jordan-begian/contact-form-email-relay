import { ContactFormFields } from "@/shared/models/ContactFormFields";
import { Observable, of } from 'rxjs';
import { delay, switchMap, catchError, timeout, retry } from 'rxjs/operators';
import { timer } from 'rxjs';
import { ajax, AjaxError, AjaxResponse, AjaxTimeoutError } from 'rxjs/ajax';

const EMAIL_RELAY_URL = process.env.NEXT_PUBLIC_RELAY_URL as string;

/* eslint-disable @typescript-eslint/no-empty-object-type */
const send = (
  path: string,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  body: ContactFormFields
): Observable<AjaxResponse<{}>> => {
  return ajax({
    url: path,
    method,
    headers: { 'Content-Type': 'application/json' },
    body,
  });
};

const client = {
  relayAsEmail: (form$: Observable<ContactFormFields>): Observable<void> => {
    return form$.pipe(
      switchMap(form => {
        return send(`${EMAIL_RELAY_URL}/email`, 'POST', form).pipe(
          timeout(10000),
          retry({
            count: 5,
            delay: (error) => {
              const errorToRetry = error instanceof AjaxTimeoutError ||
                ((error as AjaxError).status >= 500 &&
                  (error as AjaxError).status < 600);
              const retryDelay = 2000 + Math.floor(Math.random() * 3000);
              if (errorToRetry) {
                console.warn(
                  `Retrying email relay due to error: ${error.message}`,
                  { error: error.toString() }
                );
                return timer(retryDelay);
              }
              throw error;
            },
          })
        );
      }),
      delay(300),
      switchMap(() => of(void 0)),
      catchError(error => {
        console.error('Error relaying email:', error);
        throw error;
      }),
    );
  }
};

export default client;
