FROM node:16-slim

WORKDIR /service

COPY package.json \
  package-lock.json \
  ./

RUN npm install --production

COPY src ./src

EXPOSE 5001

ENTRYPOINT [ "npm", "run", "start" ]
