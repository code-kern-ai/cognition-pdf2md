ARG DHI_NODE_BUILD=dhi.io/node:20-debian12-dev
ARG DHI_NODE_RUNTIME=dhi.io/node:20-debian12

FROM ${DHI_NODE_BUILD} AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

FROM ${DHI_NODE_RUNTIME}

WORKDIR /usr/src/app

COPY --from=builder --chown=65532:65532 /usr/src/app .

ENV NODE_OPTIONS="--max-old-space-size=4096"

USER 65532:65532

EXPOSE 80

CMD ["npm", "start"]
