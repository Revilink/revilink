FROM node:18.0.0-alpine

# create destination directory
RUN mkdir -p /usr/src/revilink
WORKDIR /usr/src/revilink

# set timezone
ENV TZ=Europe/Istanbul

# copy the app, note .dockerignore
COPY . /usr/src/revilink
RUN yarn install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN yarn build

# expose 3001 on container
EXPOSE 3001

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3001

# start the app
CMD [ "yarn", "start" ]
