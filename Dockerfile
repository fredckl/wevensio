FROM node:20-slim

ARG NODE_ENV=production
RUN echo "${NODE_ENV}"
WORKDIR /service

COPY package.json \
  package-lock.json \
  ./

RUN if [ "$NODE_ENV" = "production" ]; then npm i --production; else npm i --include=dev; fi

COPY src ./src
COPY ssl ./ssl

EXPOSE 5001

ENTRYPOINT [ "npm", "run", "start" ]
