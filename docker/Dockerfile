FROM node:12.14.0-stretch

# create app directory
WORKDIR /usr/srv/app
RUN apt-get update -qq && \
    apt-get install -y \
            dos2unix

# install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# bundle app source
COPY . .

# copy required setup files
COPY docker/rootfs /

# launch the application
RUN dos2unix /entrypoint && \
    apt-get --purge remove -y dos2unix && \
    rm -rf /var/lib/apt/lists/*
RUN chmod +x /entrypoint
ENV HOST 0.0.0.0
ENTRYPOINT ["/entrypoint"]
