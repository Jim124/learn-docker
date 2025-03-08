FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json . 
COPY tsconfig.json tsconfig.json
RUN npm ci
COPY src src 
RUN npm run build

# extract dependency without dev dependencies
FROM node:22-alpine AS devops
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production

FROM gcr.io/distroless/nodejs22
WORKDIR /app
COPY --from=devops /app/node_modules node_modules
COPY --from=build /app/dist dist
ENV PORT=3000
CMD [ "dist/server.js" ]