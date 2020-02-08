FROM mhart/alpine-node:11 AS base
# Add PM2
RUN npm install -g pm2
# Working directory
WORKDIR  /home/rest-api
# Copy project file
COPY package.json .

# ---- Dependencies ---
FROM base AS dependencies
COPY yarn.lock .
# Install Node packages (production style)
RUN yarn install --production --pure-lockfile

# ---- Release ----
FROM dependencies AS release
# Copy node_modules from dependencies
COPY --from=dependencies /home/rest-api/node_modules ./node_modules
# Copy app source
COPY . .
# Expose port
EXPOSE 3300
# Run App
CMD [ "pm2-runtime", "start", "process.yml" ]