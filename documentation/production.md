# About the production environment

## The backend:

Our backend is hosted on an EC2 instance running docker in the background. HTTPS is handled by an elastic load balancer, which redirects the http traffic (as http traffic) to and from the express server hosted in the docker.

- The backend pulls from main and reboots the docker container every hour.
- The backend can be called at [https://api.kahzum.com](https://api.kahzum.com)
- Currently CORS is enabled for all origins (this may change at some point)
- Logging into the backend server can be handled like so: `ssh -i "kahzumDock.pem" ubuntu@ec2-34-215-193-17.us-west-2.compute.amazonaws.com` where `kahzumDock.pem` is a key file. Ask Mason or Farhan for access to this file if you need to get into the server
- The EC2 instance currently has 30GB reserved on it.

## The frontend:

Our frontend is hosted on an AWS Amplify and is redeployed/rebuilt as soon as something is deployed to main. That means that main must ALWAYS be a working version

## The docker container

- All env variables are saved in the .env file and the docker container uses production values (**So don't use it when developing!!!**)
- Seeing the logs for a running docker container can happen by running `docker ps`, grabbing the container id, and running `docker logs -f CONTAINER_ID`
- Currently, we think that the only want to force the docker to rebuild is to call `docker-compose down`, then rebuild with `docker-compose build`, then put it back up with `docker-compose up -d`. The `docker-reboot.sh` script handles that for now, and that runs every hour so don't change it without consulting Mason first. **TODO:** we may not need the `docker-compose down` command... that needs to be tested.

## The routing script

- `compute_route.sh` is called automatically on the EC2 instance by it's crontab every day at 1pm.
