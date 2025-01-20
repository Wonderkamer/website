# Contributing

## Prerequisites

You will need the following things properly installed on your computer.

- [A github acount and access to Wonderkamer/website](https://github.com)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Google Chrome](https://google.com/chrome/)
- [Docker](https://www.docker.com/get-started/)

## Installation

- `git clone https://github.com/wonderkamer/website wonderkamer`
- `cd wonderkamer`
- `pnpm install`

## Running / Development

- `docker compose -f docker/docker-compose.yml up` => this will start additional services such as a redis instance for queing
- `pnpm run start:dev` => this will start the backend NestJS application and an EmberJS frontend application. The later is served by the backend and has hot reloading enabled.

- Visit your app at [http://localhost:3000](http://localhost:3000).
- Visit your frontend tests at [http://localhost:3000/tests](http://localhost:3000/tests).

### Running Tests

- `pnpm run test`

### Linting

- `pnpm run lint`
- `pnpm run lint:fix`

### Building

- `pnpm run build`

### Releasing

- `pnpm run release`

Will update CHANGELOG and create a tag

### Deploying

Specify what it takes to deploy your app.

Simply push to the github repository. Tags will be deployed to production, the rest to dev.wonderkamer.com

### Docker

Builds a docker image

```
docker buildx build -f docker/Dockerfile \
                       -t ghcr.io/wonderkamer/website:develop .
```

Tests the build image

```
docker compose -f docker/docker-compose.yml up        # starts additional services
docker run  --rm \
            --env-file=.env \
            --env REDIS_HOST=host.docker.internal \
            --publish 3000:3000 \
            ghcr.io/wonderkamer/website:develop
```

- Visit your app running inside a docker container at [http://localhost:3000](http://localhost:3000).
