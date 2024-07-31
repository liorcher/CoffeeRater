# Stage 1: Build React app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy the client code
COPY coffee-client ./coffee-client

# Install dependencies and build the React app
WORKDIR /app/coffee-client

RUN npm install
RUN npm run build

# Stage 2: Build and run Express server
FROM node:18-alpine

WORKDIR /app

# Copy the server code
COPY server ./server

# Install server dependencies and build the server
WORKDIR /app/server
RUN npm install
RUN npm run build

# Copy the built React app to the server's public directory
COPY --from=builder /app/coffee-client/build /app/server/public

# Set environment variables (if any)
ENV NODE_ENV=production

# Expose the port the server will run on
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
