# Use official Node.js 18 image as base
FROM node:18-alpine AS build

# Set working directory
WORKDIR /

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React app for production
RUN npm run build

# ===============================
# Production image to serve build
# ===============================

FROM node:18-alpine AS production

# Set working directory
WORKDIR /

# Copy the build folder from the previous stage
COPY --from=build /build ./build

# Expose port 3000
EXPOSE 8080

# Start the static server
CMD ["serve", "-s", "build", "-l", "8080"]
