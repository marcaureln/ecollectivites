FROM node:current-alpine

WORKDIR /app

COPY package.json .

RUN npm set progress=false && npm install

COPY . .

RUN mkdir uploads

# Disable Prisma telemetry
ENV CHECKPOINT_DISABLE=1

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "start" ]