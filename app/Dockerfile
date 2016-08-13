FROM node:6.3.0

RUN mkdir /src

#install nodemon globally
RUN npm install nodemon -g

# install webpack globally
# RUN npm install -g webpack@1.12.9
# RUN npm install -g babel-preset-react

WORKDIR /src

# we add the package.json first so it doesn't have to rebuild unless
# the packages change
ADD package.json package.json

# for production
# RUN mkdir app
# ADD ./app-copy app/

# if app changes, no neet to install packages again 
# (RUN happens on a build if the command before it's contents are changed)
RUN npm install

# define migration (sequelize)
# RUN node_modules/.bin/sequelize model:create --name Article --attributes "slug:string, "
# RUN node_modules/.bin/sequelize model:create --name Todo --attributes "title:string, complete:boolean,UserId:integer"

ADD nodemon.json nodemon.json

# must use polling here, as file system watches are disabled over network shares, 
# which is how the container mounts our app directory
# CMD webpack --watch --watch-polling
