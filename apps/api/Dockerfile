FROM node:current-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Disable Prisma telemetry
ENV CHECKPOINT_DISABLE=1

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "start" ]