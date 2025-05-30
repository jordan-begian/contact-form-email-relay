import { ContactFormFields } from "@/shared/models/ContactFormFields";

const EMAIL_RELAY_URL = process.env.EMAIL_RELAY_URL as string;

const send = async (
  path: string,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  body: ContactFormFields
): Promise<Response> => {
  return await fetch(path, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
};

const client = {
  relayAsEmail: async (form: ContactFormFields): Promise<void> => {
    return await send(EMAIL_RELAY_URL, 'POST', form)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return;
      });
  }
};

export default client;
