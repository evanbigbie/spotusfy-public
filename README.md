# spotusfy (2020)

## about:

'Spotusfy' was my senior capstone project for my B.S. in Computer Science (May 2020) that I built with a team of 6 other people. This application utilizes the Spotify API to allow shared control of a mutual playlist between friends via a shared session. While we did accomplish the creation and control of a shared playlist, a good deal of the application functionality was in an incomplete state at the time of our project submission. This repository contains the last version I pulled that ran on my system without issue. 

I was responsible for the design, functionality, and copy for the landing page, which is complete, as well as the design and functionality of the play/pause button in the session.

## original project readme:

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
