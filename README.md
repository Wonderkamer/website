# wonderkamer

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone <repository-url>` this repository
- `cd wonderkamer`
- `npm install`

## Running / Development

- `ember serve` or `pnpm run start`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

- `pnpm run test`

### Linting

- `pnpm run lint`

### Manual building (not needed)

- `ember build` (development)
- `ember build --environment production` (production)

### Releasing

`pnpm run release`

Will generate a release with a changelog and tags it. Push to github to deploy.

### Deploying

Deployment is done via github actions. If you deploy changes to the development branch they will be deployed to dev.wonderkamer.com. If you tag a commit it will be deployed to wonderkamer.com.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
