# Use a node base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock, pnpm-lock.yaml, etc.)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install ts-node and typescript globally (in case it's not part of dependencies)
RUN npm install -g ts-node typescript

# Install Prisma CLI
RUN npm install -g prisma

# Copy the prisma folder (this will contain the schema.prisma file)
COPY prisma ./prisma

# Run prisma generate
RUN npx prisma generate

# Copy the rest of your application files
COPY . .

# Expose the application port (optional, based on your app's need)
EXPOSE 3000

# Run the application using ts-node
CMD ["npx", "ts-node", "src/index.ts"]
