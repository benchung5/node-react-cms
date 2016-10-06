#!/bin/bash

# create docker machine on new digital ocean droplet:

# digital ocean: "A 32-bit operating system is recommended for cloud servers with less than 3 GB of RAM -- this is especially true for servers with 1 GB, 
# or less, of RAM. Processes can require significantly more memory on the 64-bit architecture. On servers with a limited amount of RAM, 
# any performance benefits # that one might gain from a 64-bit operating system would be diluted by having less memory available for buffers and caching.""
# try 32 bits 512mgb or 1gb or ram. But there is an error installing if you don't use x64 and it won't complete compose up if you use 512mb.

# docker-machine create --driver digitalocean --digitalocean-image ubuntu-14-04-x64 --digitalocean-size 1gb --digitalocean-access-token $DOTOKEN machine-name
docker-machine create --driver digitalocean --digitalocean-image ubuntu-14-04-x64 --digitalocean-size 1gb --digitalocean-access-token=e3322ac4b581f2b08955ec9bbbbdbe1a7353177ee54ee8215263e541b4ea5cf1 node-nginx3

# make the droplet machine the active host:
docker-machine env node-nginx3
eval $(docker-machine env node-nginx3)

#list docker machines:
docker-machine ls

# inspect it, copy ip:
# docker-machine inspect node-nginx3 (for more info)
docker-machine ip node-nginx3

# run docker compose on it (deamon mode):
# (this applies the production file over the original one)
# docker-compose -f docker-compose.yml -f production.yml up -d
# this uses the production file instead of the original
docker-compose -f production.yml up -d

# inspect the containers:
docker-compose ps

# copy over our app files to the machine:
# our local folder doesn't exist in the Docker Machine default thats running inside VirtualBox
# so me must copy it manually:
# delete the "local" directory inside the Docker Machine
# docker-machine ssh node-nginx3
# remove the local directory # rm -rf $(pwd)
# rm -rf $(pwd)
# create the "local" directory inside the Docker Machine:
# mkdir -p $(pwd)
# exit out of the mashine shell
# exit
# use the Docker Machine scp command to copy the files from our local docker host into that folder inside the machine
# Arguments are [machine:][path] [machine:][path]
# example: docker-machine scp -r localhost:[path] node-nginx3:[path]
docker-machine scp -r . node-nginx3:$(pwd)




