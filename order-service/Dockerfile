FROM node:20.11.1

ENV NODE_ENV production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

USER node
WORKDIR /home/node/code
COPY . /home/node/code

RUN pnpm install

EXPOSE 3000

CMD [ "pnpm", "start" ]