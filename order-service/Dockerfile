# Base Image
FROM node:20.11.1-alpine3.19

# Setup PNPM
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set work directory, imagine like "cd /home/node/code" in shell
WORKDIR /home/node/code

# Bundle App source
COPY . .

# Install application dependencies
RUN pnpm install

RUN pnpm build

EXPOSE 3000

# Startup command
CMD ["pnpm", "start"]