FROM node

# Create app directory
WORKDIR /usr/src/app

# install mongodb
RUN apt-get update && apt-get install -y mongodb

# Install app dependencies
COPY package.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]