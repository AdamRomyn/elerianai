# Use an official Node.js runtime as the base image
FROM node:18 as build-stage

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the Vue.js application for production
RUN npm run build

# Use Nginx as the base image for the final container
FROM nginx:alpine

# Copy the built Vue.js app from the build stage to the Nginx web root directory
COPY --from=build-stage usr/src/app/dist /usr/share/nginx/html

# Expose port 80 to allow external access
EXPOSE 80

# Command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
