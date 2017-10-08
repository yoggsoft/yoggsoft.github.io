FROM node:7.5

ENV APP_NAME yoggsoft
WORKDIR /var/www

# install build tools
RUN npm install --global

# copy the project
ADD ./package.json /var/www/package.json
RUN npm install

ADD . /var/www

# install packages and build
RUN npm run build


CMD ["node", ".", "--production"]
