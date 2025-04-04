# Stage 1: Build the application
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:14 AS serve

# Install serve globally
RUN npm install -g serve

# Set the working directory inside the container
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/build ./build

# Expose port 9000
EXPOSE 9000

# Serve the application
CMD ["serve", "-s", "build", "-l", "9000"]