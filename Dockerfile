FROM node:7.7.2-alpine

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY ./package.json ./package.json
RUN npm install --no-progress
COPY ./ ./

CMD [ "node", ".", "--production" ]
