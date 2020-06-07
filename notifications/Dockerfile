FROM node:12.11.1-alpine

WORKDIR /usr/src/notifications

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]