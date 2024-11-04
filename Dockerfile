# Use Node.js as the base image
FROM node:21

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml files to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Build the React application
RUN pnpm run build

# Expose the correct port
EXPOSE 5173

# Start the application
CMD ["pnpm", "start"]
