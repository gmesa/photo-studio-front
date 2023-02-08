# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:19-alpine3.16
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY ["package.json","package-lock.json", "/app/"]
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm config set legacy-peer-deps true 
RUN npm install 
COPY [".", "/app/"]
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
#CMD [ "npx", "serve", "build" ]
