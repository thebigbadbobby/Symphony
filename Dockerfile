FROM node:12

# Create app directory
WORKDIR /usr/src/app

COPY . . 
# copies the current directory into the container
# an npm script that installs front and backend dependencies
RUN npm install
WORKDIR client/
RUN npm install
RUN npm install @stripe/stripe-js
RUN npm install @stripe/react-stripe-js
RUN npm install react-router
WORKDIR ..
# https://we-are.bookmyshow.com/understanding-expose-in-dockerfile-266938b6a33d
EXPOSE 3000
EXPOSE 5000
 # Whatever ports you plan on using
CMD [ "npm", "run", "dev"] # an npm script that does `cd client && npm run start`