FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn generate

EXPOSE 3000

CMD ["yarn", "start"]