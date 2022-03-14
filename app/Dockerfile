FROM node:16
WORKDIR /app
COPY . /app

ENV VIRTUAL_HOST=shiftpuzzle.brophet.de
ENV LETSENCRYPT_HOST=shiftpuzzle.brophet.de

ENV URL_LIVE=https://shiftpuzzle.brophet.de
ENV PORT_LIVE=80
ENV URL_LOCAL=http://localhost:
ENV PORT_LOCAL=3000

ENV LIVE_OR_LOCAL=local
#ENV LIVE_OR_LOCAL=live

RUN npm install