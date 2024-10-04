FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

FROM builder as app
CMD ["node", "src/index.js"]

FROM builder as job
CMD ["node", "src/requests.js"]