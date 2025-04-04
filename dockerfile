# Stage 1: Build the application
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install the dependencies using yarn
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn build

# Stage 2: Serve the application
FROM node:16 AS serve

# Install serve globally using yarn
RUN yarn global add serve

# Set the working directory inside the container
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/build ./build

# Expose port 9000
EXPOSE 9000

# Serve the application
CMD ["serve", "-s", "build", "-l", "9000"]