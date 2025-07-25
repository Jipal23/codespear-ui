# Step 1: Use Node.js as the base image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build the app (assuming you're using something like React or Vue)
RUN npm run build

# Step 2: Create a production image
FROM node:18-alpine

# Install serve globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy build files from previous stage
COPY --from=build /app/build ./build

# Expose the port serve will use
EXPOSE 8080

# Default command to run your app using serve
CMD ["serve", "-s", "build", "-l", "8080"]
