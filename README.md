# Kahzum Logistical Delivery Platform

## Production Setup

- We currently have a production environment set up for both the backend api and the frontend application.
- The frontend for small business owners can be found by navigating to [my.kahzum.com](https://my.kahzum.com)
- The backend is hosted on [api.kahzum.com](https://api.kahzum.com).
  - Please note that there is no documentation currently publicly available for the api because it is not secured, so our best protection right now is secrecy.
  - The production environment is hosted in a docker container for portability across environments.

## Dev Setup

1. You must have node.js installed (v10+)
2. Clone the repository

```bash
  git clone https://github.com/mlpierce22/kahzum-app
```

3. Install the .env file in the root directory of the repo (same level as package.json). You can find this file [here](https://drive.google.com/drive/u/0/folders/1h9CU87eD4Zl5cfRoPP3CgqPF0SmlagkZ)

   - **Note**: this doesn't get twilio running. If you want to run/test twilio, you will need to install the cli globally with `npm i twilio-cli -g`.

4. Install dependencies and boot:

```bash
# Install dependencies for server and client
npm run update

# Run the client, server, and twilio (if applicable) concurrently
npm run dev

# Run the Express server only
npm run server

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

**Note**: these instructions will only work on a linux based system (aka mac or bash)

**Note 2**: There is no interface currently for drivers... we need to enter them into the database manually (and you need to be a driver to be eligible to recieve texts for Twilio)

### Running pre-production docker

If you want, you can run the entire backend in a docker container. If you do so, the api will be accessible at `http://localhost`. Please note that this uses the production database url, so be careful when doing this.

1. Make sure you have `docker` and `docker-compose` installed (I don't remember if it needs to be global)
2. Run `./docker-reboot.sh`

## Other Useful scripts we wrote

```bash
# Update just the client's npm packages
npm run client-install

# Run the server with node
npm run start

# Run the server nodemon
npm run server

# Run the twilio development server
npm run twilio-dev

# Run the twilio production server (with the production phone number)
npm run twilio-prod

# Kills all running node processes. Helpful when there is a memory leak
npm run kill

# Lints the server files
npm run lint

# Lints and tries to fix if possible
npm run lint:fix

# Builds docker (only works if you have docker installed)
npm run docker

# Runs a production environement (mainly used by the docker container)
npm run prod
```

## Testing

See `/scrum-docs/Testing` file and see `__tests__` folder

## Scrum documents

See the `/scrum-docs` folder

## Other Documentation

See the `/documentation` folder
