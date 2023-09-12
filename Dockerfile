# Use the official Node.js image from the Docker Hub
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install npm packages
RUN npm install

# Copy the source code to the working directory
COPY . .

# Expose port 3001 to interact with the application
EXPOSE 3001

# Command to run the application
CMD [ "npm", "start" ]
