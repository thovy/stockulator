FROM node:18.10.0
MAINTAINER thovy <kingvely151113@gmail.com>

RUN mkdir -p /app
WORKDIR /app
ADD . /app

RUN npm install

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]
