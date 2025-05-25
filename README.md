# Contact Form & Email Relay 📨
[![CodeQL](https://github.com/jordan-begian/contact-form-relay/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/jordan-begian/contact-form-relay/actions/workflows/github-code-scanning/codeql)<br>
[![Build, Containerize, and Deploy Express API](https://github.com/jordan-begian/contact-form-relay/actions/workflows/deploy-backend.yml/badge.svg)](https://github.com/jordan-begian/contact-form-relay/actions/workflows/deploy-backend.yml)<br>
[![Deploy to GitHub Pages](https://github.com/jordan-begian/contact-form-relay/actions/workflows/github-pages-deploy.yml/badge.svg)](https://github.com/jordan-begian/contact-form-relay/actions/workflows/github-pages-deploy.yml)<br>
[![Terraform Apply](https://github.com/jordan-begian/contact-form-relay/actions/workflows/terraform.yml/badge.svg)](https://github.com/jordan-begian/contact-form-relay/actions/workflows/terraform.yml)

A contact form to send a name, contact info, and message to an email relay API which will send the contact information to a target email address.

## Stack 📦

- [Node.js](https://nodejs.org/docs/latest/api/)
- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev/reference/react)
- [Tailwind](https://tailwindcss.com/docs)
- [Express](https://expressjs.com/en/guide/routing.html)
- [Nodemailer](https://nodemailer.com/)
- [RxJs](https://rxjs.dev/guide/overview)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Docker](https://docs.docker.com/)
- [Terraform](https://developer.hashicorp.com/terraform/docs)

## Project Structure 🏗️

```text
├── .github/
│   └── workflows/         # GitHub Actions jobs
├── src/
│   ├── pages_services/    # Logic for page components to use
│   ├── pages/
│   │   ├── components/    # Components of the UI
│   │   ├── styles/        # Page styling
│   │   ├── index.ts       # Main page assembling UI components
│   │   └── _app.ts        # Core Next.js component
│   ├── backend/
│   │   ├── services/      # Logic for Email Relay API
│   │   ├── controller/    # Handler for API request & responses
│   │   ├── routes/        # Email Relay API endpoint config
│   │   ├── app.ts         # Core API application config
│   │   └── tsconfig.json  # Typescript compiler config for backend
│   └── shared/
│       ├── models/        # Types used throughout project
│       └── utils/         # Shared utilities throughout project
├── terraform/             # Terraform config files for cloud infrastructure
│
├── next.config.js         # Next.js config file
├── package.json           # Node config file
├── tsconfig.json          # Main Typescript compiler config
├── eslint.config.mjs      # Eslint config file
├── postcss.config.mjs     # PostCSS config for Tailwind
├── Dockerfile             # Main Docker config file
├── docker-compose.yml     # Docker container config file
```

## Setup 🛠️

### 1. Have node installed on dev machine
  - [Node.js install instructions](https://nodejs.org/en/download)

### 2. Install project dependencies via `npm`
  - [About `npm`](https://docs.npmjs.com/about-npm)

```shell
npm install
```

### 3. Create a CORS `config` directory in project root

```shell
mkdir -p config; \
  echo '[ "http://localhost:3000" ]' > config/cors-origins.json;
```
*This allows for the UI running locally on port `3000` to communicate with the API running locally on port `8080`*


*Note: The ports listed are the default values for Next.js & Express.js, they are configurable if other ports are desired*

### 4. Configure editor with local values for `process.env` variables used in project
  - Variables located in [`ConfigHelper.ts`](./src/shared/utils/ConfigHelper.ts)
  - Set local values for variables in terminal or in editor workspace settings

```shell
# Example: Set values in terminal
export VARIABLE_NAME='variable-value'
```


```jsonc
// Example: Set values in VS Code launch config
{
  "configurations": [
    {
      /* ...launch configuration... */
      "env": {
        "VARIABLE_NAME": "variable-value"
      }
    }
  ]
}
```

## How to Run Locally 💻

The following commands can be ran in the terminal from the project root directory, or can be used by editors run/launch config.

🔗 [*VS Code launch config documentation resource*](https://code.visualstudio.com/docs/debugtest/debugging-configuration)

### Frontend

```shell
npm run build:ui; \
  npm run dev:ui;
```

### Backend

```shell
npm run build:api; \
  npm run dev:api;
```

## How to Deploy 📡

Deployment accomplished using Terraform, Docker and GitHub Actions workflows. This way any changes pushed to the `main` branch will automatically be deployed to the cloud service provider.

### Infrastructure

- [Terraform](./terraform/main.tf)
  - `outputs.tf` & `variables.tf` are support files for the `main.tf` config file
- [GitHub Actions](./.github/workflows/terraform.yml)

### Frontend

- [GitHub Actions](./.github/workflows/github-pages-deploy.yml)

### Backend

- Docker
  - [docker-compose.yml](./docker-compose.yml)
  - [Dockerfile](./Dockerfile)
- [GitHub Actions](./.github/workflows/deploy-backend.yml)
