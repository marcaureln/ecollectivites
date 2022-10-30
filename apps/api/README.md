# eCollectivités API

This repository contains the eCollectivités project REST API.

## Built with

These are packages used in app worth mentioning :

- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Twilio SDK](https://www.npmjs.com/package/twilio)
- [Access control](https://www.npmjs.com/package/accesscontrol)
- [Nodemon](https://www.npmjs.com/package/nodemon)

## Getting started

### Prerequisites

Before diving into the app you should get a Twilio account. The application use their Verify API to authenticate user through their phone.

- Create a [Twilio account](https://www.twilio.com/).
- Create a [Verify service](https://www.twilio.com/fr/docs/verify).

### Option 1: Using Docker Compose

#### Prerequisites

- [Install Docker Compose](https://docs.docker.com/compose/install/)

#### Steps

1. Clone the repo
2. Create a `.env` file in project root and copy `example.env` content into it.
3. Update your `.env` file with your Twilio credentials and your Postgres database URL
4. Open terminal in project root and run

```bash
docker-compose up -d # -d to run in detached mode
```

5. The application should be listening on [http://localhost:3000](http://localhost:3000)
6. Before use, add initial data to the app with the following command:

```bash
docker-compose run app npm run seed
```

7. (Optional) Add an admin. Before connect to the docker container and enter the following command :

```bash
npm run add-admin --firstname=Alex --lastname=NGuessan --email=alex@e.co --collectid=7
```

### Option 2: Using Node

#### Prerequisites

- Install Node.js
- Install PostgreSQL

#### Steps

1. Clone the repo
2. Create a `.env` file in project root and copy `example.env` content into it.
3. Update your `.env` file with your Twilio credentials and your Postgres database URL
4. **Optional**: Add the following line to your `.env` to disable Prisma telemetry

```
ENV CHECKPOINT_DISABLE=1
```

1. Open terminal in project root and run

```bash
npm install # Install node packages in package.json
npx prisma generate # Generate Prisma Client
npm run seed # Add initial data to the database
npm run dev # Run the app with nodemon
```

5. The application should be listening on [http://localhost:3000](http://localhost:3000)
6. Before use, add initial data to the app with the following command:

## Contributing

**⚠️ Never work on master branch ⚠️**
