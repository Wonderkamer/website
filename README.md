# wonderkamer

This README outlines the details of collaborating on this application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

- [A github acount and access to Wonderkamer/website](https://github.com)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Google Chrome](https://google.com/chrome/)
- [Docker](https://www.docker.com/get-started/)

## Installation

- `git clone git@github.com:Wonderkamer/website.git` this repository
- `cd wonderkamer`
- `pnpm install`

### Releasing

`pnpm run release`

Will generate a release with a changelog and tags it. Push to github to deploy.

### Deploying

Deployment is done via github actions. If you deploy changes to the development branch they will be deployed to dev.wonderkamer.com. If you tag a commit it will be deployed to wonderkamer.com.

See [CONTRIBUTING](./CONTRIBUTING.md) for further instructions.
