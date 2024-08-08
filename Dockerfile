FROM node:20
WORKDIR /
COPY ./envs /envs
COPY ./Dockerfile /
COPY ./package.json /

RUN npm install