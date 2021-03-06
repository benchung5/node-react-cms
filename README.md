Node React CMS
===============

> A startup CMS using Docker Compose, Node, and React

## Requirements

- [Docker Toolbox](https://www.docker.com/products/docker-toolbox) (not required for Linux)
- a [docker hub](http://hub.docker.com) account

## Summary

It's not a full blown CMS but more of a starting point to build upon.
Uses an admin dashboard to view/add/delete users and articles (pages).

The admin UI is built with React with webpack. Site pages are templated using ejs and Sass for styling.
The back-end api uses Express, Sequelize (ORM) and a single Postgres database.
[Adminer](https://www.adminer.org/) gets installed as well to opionally navigate the DB.

## To run:
```
	> docker-compose up
```

To create the database (if run for the first time)
bash into the postgres container:
```
docker exec -i -t <postgres_container_name> bash
```

Create database then quit:
```
psql -U postgres
CREATE DATABASE demo_schema;
\q
```

Import schema from the dump folder then exit:
(this is located in the db-dumps folder locally)
```
psql -U postgres demo_schema < app-db-dumps/dbexport.pgsql
exit
```

If you need to export the database again after working on it:
```
pg_dump -U postgres demo_schema > app-db-dumps/dbexport.pgsql
```

To previewe:
(example: 192.168.99.100:80 on Windows.
Get this through: docker-machine ip MACHINE_VM))
```
<machine-ip>:80
```

Access Adminer:
```
<machine-ip>:4001
```

Plug this in for the Postgres login settings:
```
system: postgresSQL

db server:
192.168.99.100:5432

username:
postgres

pass:
3x1mpl3
```
For React Development:
make sure webpack is installed globally, navigate to your app folder then run:
```
webpack --watch --progress --watch-polling
```

For Sass development:
make sure compass is installed, navigate to your app folder then run:
```
compass watch
```
## Troubleshooting


If it says there's no database but you've created one, first try modifying a file then saving it to get nodemon going and have it build/update the app.

If docker is giving you trouble try recreating the containers:
```
docker-compose up --force-recreate
```

To rebuild all including images:
(make sure to backup your database first)
```
docker rm -f $(docker ps -a)
docker rmi -f $(docker images)
docker-compose up
```

## Todo
Things that should be done in the near future:

- make react version contact form
- make the menu router logic modular
- enable editing of articles after creation
- create a tree for managing/arranging menu items
- create a shortcode method for contact form instead of contact page template