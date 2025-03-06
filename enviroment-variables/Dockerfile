FROM  node:22-alpine

WORKDIR /app

COPY . .

RUN npm ci

ENV PORT=3000

CMD [ "node","server.js" ]