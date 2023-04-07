FROM node:18.15.0-buster

WORKDIR /app

COPY package*.json .

RUN npm ci 

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]