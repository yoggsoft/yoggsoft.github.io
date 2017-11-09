FROM node:7.7.2-alpine

ENV APP_NAME yoggsoft

RUN mkdir -p /var/www

WORKDIR /var/www

RUN npm install --quiet

ADD ./package.json /var/www/package.json
RUN npm install

ADD . /var/www

RUN npm run build
