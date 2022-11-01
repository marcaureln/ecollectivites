FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN mkdir uploads

# Disable Prisma telemetry
ENV CHECKPOINT_DISABLE=1

RUN npx prisma generate

EXPOSE 8000

CMD [ "yarn", "start" ]