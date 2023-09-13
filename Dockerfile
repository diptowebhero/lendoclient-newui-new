# Base on offical Node.js Alpine image
FROM node:16-alpine
#FROM  node:14.5.0-alpine
# Set working directory
WORKDIR /usr/app

# Install PM2 globally
#RUN npm install --global yarn
RUN npm install -f --global pm2

RUN rm -rf ./.next

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./
COPY ./ecosystem.config.json ./

# Install dependencies
#RUN npm ci --force --loglevel verbose
COPY ./.env.sample ./.env.production
RUN yarn install --production

# Copy all files
COPY ./ ./

# Build app
RUN yarn run build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "start", "ecosystem.config.json" ]
