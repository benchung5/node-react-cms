# *not for windows*
# this will give us ssh ability to our docker machine, then rsync our app updates to the docker machine whenever nodemon call this using:
# nodemon -x syncandrestartcontainers.sh
# from: https://alexanderzeitler.com/articles/docker-machine-and-docker-compose-developer-workflows/
eval $(ssh-agent)
ssh-add ~/.docker/machine/machines/default/id_rsa
rsync -avzhe ssh --relative --omit-dir-times --progress ./ docker@$(docker-machine ip default):$(pwd)
docker-compose up