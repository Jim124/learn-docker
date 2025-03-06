# install nodejs 22 version
FROM node:22

# create workplace
WORKDIR /app

# copy package json file
COPY package*.json .

#install dependencies
RUN npm ci
# copy the source code of our app
COPY src/server.js server.js

#expose the application port
EXPOSE 3000

# start application
CMD [ "node","server.js" ]