FROM node:18.15.0-buster as build

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --production

COPY . .

RUN npm run build

# NGINX webSeRVER
FROM nginx:1.2-alpine as production

COPY --from=build /code/build /usr/share/nginx/html

EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]