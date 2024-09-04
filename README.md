# WEVENSIO

WESENSIO is a micro service for delivery message.

It is based on [NodeJS](https://nodejs.org/en), [Socket.io](https://socket.io) and [Redis](https://redis.io) technologies.

## Install with npm

```shell
git clone git@github.com:fredckl/wevensio.git

npm i --production
```

Complet `.env` file

```s
NODE_ENV=production
PORT=5001
SUBSCRIBE=subscribe.test
CHANNELS=on_add_user
SOCKET_IO_CORS_ORIGIN=*
REDIS_URL=redis://host.docker.internal:6379
```

Run app

```shell
npm run start
```

> Make sure you've installed Redis and that it's ready to use.

## Use

On your front end application

```html
<script>
  const socket = io("http://localhost:5001");
  socket.on("connected", () => {
    socket.emit("subscribe.test"); // ← Choose your subscribe name
  });

  socket.on("on_add_user", (event) => {
    console.log(event);
  });

  // socket.disconnect();
</script>
```

## Develop with Docker compose

```shell
docker-compose up -d
```

Open file `example/client/index.html` for test

## Docker

Build

```shell
docker build -t wesensio .
```

Use

```shell
docker run -p 5001:5001 --env-file .env --name wesensio wesensio -v ./logs:/service/logs
```

### Redis

Go to Redis Web interface

[http://http://localhost:8001/redis-stack/pub-sub](http://localhost:8001/redis-stack/pub-sub)

click to subscribe and add message on channel on_add_user
