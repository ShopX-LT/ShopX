FROM node:18.15.0-buster as build

WORKDIR /app

COPY package*.json .

RUN npm ci 

COPY . .

RUN npm run build

FROM nginx

EXPOSE 4000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# FROM node:18.15.0-buster as production

# WORKDIR /app

# COPY --from=build /app/dist /app/dist
# EXPOSE 4000

# COPY package.json .
# COPY vite.config.js .

# EXPOSE 4000
# CMD [ "npm", "run", "preview" ]