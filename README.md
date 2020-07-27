# spotusfy-web

> Static site to host functions for Spotusfy

## Table of Contents
- [Dev Setup](#dev-setup)
- [Useful Docker Commands](#useful-docker-commands)
- [Useful External Resources](#useful-external-resources)

## Dev Setup

``` bash
To run you need docker with docker-compose installed. Running `docker-compose
build` will initialize your local image. `docker-compose up -d` will start the
environment and expose port 80 on your docker-machine host (typically
localhost or 192.168.99.100 with Docker Toolbox for Windows).
```

## Useful Docker Commands
- `docker-compose up --build -d` - Start the container with a fresh build (installs dependencies if needed) and
    detach after loading
- `docker-compose down` - Stops the local development environment from running in the background
- `docker-compose exec web sh` - Opens an interactive terminal to the application container
- `docker-compose exec web npm install` - Reads the current package.json and install the required dependencies
- `docker-compose logs -f --tail 20 web` - Reads the last 20 lines of the api container logs and displays to a
    continuous feed afterwards
- `docker-compose run web npm run lint-fix` - Runs eslint fix

## Useful External Resources
The project uses Vue.js with Nuxt.js - for detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
