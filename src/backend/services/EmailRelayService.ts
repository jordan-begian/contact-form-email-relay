import { Message } from '@/backend/models/RelayModels';
import mailer from '@/backend/utils/NodemailerUtil';
import { ContactFormFields } from '@/shared/models/ContactFormFields';
import { Observable, of, switchMap } from 'rxjs';

const service = {
  emailRelay: (form: Observable<ContactFormFields>): Observable<void> => {
    return form.pipe(
      switchMap((fields: ContactFormFields) => {
        const name = `${fields.firstName} ${fields.lastName}`;
        const subject: string = `Contact From Submission: ${name}`;
        const body: string = `
        Name: ${name}
        Contact Info: ${fields.contactInfo}

        Message:
        ${fields.message}
        `.replace(/^[ \t]+/gm, '').trim();
        const message: Observable<Message> = of({
          subject: subject,
          body: body
        });
        return mailer.sendEmail(message);
      }))
  }
};

export default service;
