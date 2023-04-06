FROM node:18.15.0-buster

WORKDIR /ShopX/server

COPY . .

RUN npm install -g npm@9.6.2

RUN npm i 

EXPOSE 3030

CMD ["node", "server.js"]