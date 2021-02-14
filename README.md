# Symphony

## Value Proposition
- Connected through virtual and real channels
- Open Source
- Collaborate to create additional features and resources
- no underlying commitment
- Get involved- take on a more active role via chair discussion
## Dev Setup

1. You must have node.js installed (v10+)
2. Clone the repository

```bash
  git clone https://github.com/thebigbadbobby/Symphony/
```

3. Install the .env file in the root directory of the repo (same level as package.json). You can find this file [here](https://drive.google.com/drive/u/0/folders/1h9CU87eD4Zl5cfRoPP3CgqPF0SmlagkZ)

4. Install dependencies and boot:

```bash
# Install dependencies for server and client
npm run update
# If node_modules wasn't automatically installed in client folder, cd into client folderand run again.

# Run the client and server
npm run dev

# Run the Express server only
npm run server

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

**Note**: these instructions will only work on a linux based system (aka mac or bash)

## Other Useful scripts we wrote

```bash
# Update just the client's npm packages
npm run client-install

# Run the server with node
npm run start

# Run the server nodemon
npm run server

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
