FROM node:12.16

WORKDIR /usr/src/notifications

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]