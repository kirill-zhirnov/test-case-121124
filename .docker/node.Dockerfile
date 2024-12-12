FROM node:21-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
USER node
COPY --chown=node:node package.json package-lock.json ./
RUN npm install
COPY --chown=node:node src src
COPY --chown=node:node data data
COPY --chown=node:node tsconfig.json  eslint.config.mjs ./

RUN npm run build

CMD ["npm", "run", "start"]