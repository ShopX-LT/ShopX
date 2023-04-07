FROM node:18.15.0-buster as build

WORKDIR /app

COPY package*.json .

RUN npm ci 

COPY . .

RUN npm run build

FROM nginx

EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
