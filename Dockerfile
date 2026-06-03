ARG PARENT_IMAGE=registry.dev.kern.ai/code-kern-ai/refinery-parent-images:hardened-images-next
ARG DHI_NODE_BUILD=dhi.io/node:20-debian12-dev

FROM ${DHI_NODE_BUILD} AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY . .

FROM ${PARENT_IMAGE}

WORKDIR /usr/src/app

COPY --from=builder --chown=65532:65532 /usr/src/app .

ENV NODE_OPTIONS="--max-old-space-size=4096"

USER node

EXPOSE 80

CMD ["node", "server.js"]
