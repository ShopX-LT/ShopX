FROM node:18.15.0-buster as build

WORKDIR /app

COPY package*.json .

RUN npm ci 

COPY . .

RUN npm run build

CMD [ "npm", "run", "dev" ]

EXPOSE 4000