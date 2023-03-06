FROM node:16-alpine

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
apk add --no-cache libc6-compat git

# Set working directory
WORKDIR /app

# Copy source files
COPY . .

# Install app dependencies.
RUN yarn config set registry https://registry.npmmirror.com && yarn install

EXPOSE 3000
CMD ["./bin/start"]
