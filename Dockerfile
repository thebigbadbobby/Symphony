FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# https://we-are.bookmyshow.com/understanding-expose-in-dockerfile-266938b6a33d
EXPOSE 8080
CMD [ "node", "server.js" ]