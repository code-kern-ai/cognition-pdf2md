ARG DHI_NODE_BUILD=dhi.io/node:20-debian12-dev
FROM ${DHI_NODE_BUILD}

WORKDIR /usr/src/app

VOLUME ["/usr/src/app"]

USER root

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"

USER 65532:65532

EXPOSE 80

CMD ["npm", "start"]
