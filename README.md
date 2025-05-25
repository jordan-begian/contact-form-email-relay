# Contact Form & Email Relay

A contact form to send a name, contact info, and message to an email relay API which will send the contact information to a target email address.

## Dependencies

- [Node.js](https://nodejs.org/docs/latest/api/)
- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev/reference/react)
- [Express](https://expressjs.com/en/guide/routing.html)
- [RxJs](https://rxjs.dev/guide/overview)
- [Typescript](https://www.typescriptlang.org/docs/)

## Project Structure

```
├── next.config.js
├── package.json
├── tsconfig.json
├── public/                # Destination for build export
├── src/
│   ├── pages/
│   │   ├── components/    # Components of the UI
│   │   ├── services/      # Logic to be used in page layouts
│   │   ├── styles/        # Page styling
│   │   ├── index.ts       # Main page assembling UI components
│   │   └── _app.ts        # Core Next.js component
│   ├── backend/
│   │   ├── services/      # Logic for Email Relay API
│   │   ├── controller/    # Handler for API request & responses
│   │   ├── routes/        # Email Relay API endpoint config
│   │   └── app.ts         # Core API application config
│   └── shared/
│       ├── models/        # Types used throughout project
│       └── utils/         # Shared utilities throughout project
├── .github/
│   └── workflows/         # GitHub Actions jobs
```

## Setup

- TODO

## How to Run Locally

- TODO

## How to Deploy

- TODO
