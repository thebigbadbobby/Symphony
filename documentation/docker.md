# Docker

### A general assortment of useful commands

`docker-compose build` - builds the docker container  
`docker-compose up -d` - runs an already build docker container in the background (hence -d)  
`docker-compose down`  
`docker container prune` - gets rid of a bunch of unused containers  
`docker ps` - lists all the currently running docker containers  
`docker rm` - removes a docker container (I think)  
`docker logs <containerId>` - shows the logs for that docker container  
`docker cp <local_path> <containerId>:<pathInContainer>` - copy's a file to a container  
`docker exec -it <containerId> bash` - essentially ssh's into the container
