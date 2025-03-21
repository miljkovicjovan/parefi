# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json .npmrc* ./

# Install dependencies using npm
RUN npm ci

# Copy the application files into the container
COPY . .

# Expose the Next.js default port (3000)
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]