FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY ./config ./config
COPY ./dist ./dist

EXPOSE 8080

CMD ["node", "./dist/backend/app.js"]
