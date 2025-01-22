FROM node:20

WORKDIR /app

COPY package.json .

RUN pnpm

COPY . .

RUN npm build

CMD ["pnpm", "start"]