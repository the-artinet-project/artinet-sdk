# test.dockerfile
FROM node:20-alpine

WORKDIR /test

# Copy package tarball
COPY ../artinet-sdk-*.tgz /tmp/

# Create test project
RUN npm init -y && \
    npm install /tmp/artinet-sdk-*.tgz express @a2a-js/sdk @modelcontextprotocol/sdk

# Copy test file
COPY ./deployment/test-pack.js .

CMD ["node", "test-pack.js"]