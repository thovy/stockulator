FROM node:12
MAINTAINER thovy <kingvely151113@gmail.com>

WORKDIR /bin/sh
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
