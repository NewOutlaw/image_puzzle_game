FROM node:20
WORKDIR /
COPY ./app /app
COPY ./envs /envs
COPY ./Dockerfile /
COPY ./package.json /

RUN npm install