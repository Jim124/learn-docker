#install nodejs
FROM node:22-alpine AS build

#create workplace app
WORKDIR /app

#copy package*.json to workplace
COPY package*.json .

# copy file to workplace
COPY . . 

# install dependencies
RUN npm ci

# generate dist folder
RUN npm run build

# install nginx
FROM nginx:1.27.0

# copy dist folder to nginx 
COPY --from=build /app/dist /usr/share/nginx/html
