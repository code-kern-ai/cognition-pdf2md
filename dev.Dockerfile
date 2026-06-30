ARG PARENT_IMAGE=node:20-alpine
FROM ${PARENT_IMAGE}

WORKDIR /usr/src/app

VOLUME ["/usr/src/app"]

USER root

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"

EXPOSE 80

CMD ["npm", "start"]
