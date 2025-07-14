# OTP Token API

REST API to manage OTP tokens

## Development Setup

### Utilized Tools

- Node.js (v24.1.0)
- pnpm (You can use any `package manager`)
- Podman (You can use any `docker` engine)
- DataGrip (optional, for database management)

### Running in Development Mode

1. Clone the repository

```bash
git clone https://github.com/yourusername/otp-token-api.git
cd otp-token-api
```

2. Install dependencies

```bash
pnpm install
```

`OR`

```bash
npm install
```

3. Set up environment variables

```bash
cp src/docs/.env.example .env
# Edit .env with your configuration
```

4. Start the database

```bash
podman compose -p otp-token-api -f docker/docker-compose.db.yaml --env-file=.env up -d
```

`OR`

```bash
docker compose -p otp-token-api -f docker/docker-compose.db.yaml --env-file=.env up -d
```

5. Generate Prisma client

```bash
pnpm run db:generate
```

6. Push database schema

```bash
pnpm run db:push
```

7. Start the development server

```bash
pnpm run dev
```

The API will be available at `http://localhost:8080` by default if you dont have modified `HOST` or `PORT` env vars.

## Database Management

You can use DataGrip or any other database management tool to connect to the PostgreSQL database, using same values as in the `.env` file that you configured.

`OR`

You can use the Prisma CLI to manage the database:

```bash
pnpm run db:studio
```

## Production Setup

### Database

This configuration establishes a connection to a database hosted on Neon DB,

#### Database setup process:

1.  Created database on Neon DB platform
2.  Used Prisma's `db:push` command locally to manually create tables
3.  Connection is established via Prisma Client using the DATABASE_URL from environment variables

### Docker

#### Dockerfile

The Dockerfile is used to build the production image of the API. It uses a multi-stage build to ensure a small final image size. The dockerfile is located at `docker/Dockerfile`.

#### Dockerhub

The Docker image is pushed to Dockerhub under the repository `brindocker/otp-pipeline`. The pipeline is configured in `.github/workflows/docker-image.yml`.

## Notes

### How to Customize Token Expiration Time

To customize the token expiration time, you can pass a `expiresInMinutes` body param when creating a new token. If you don't specify this parameter, the default expiration time is set to 10 minutes.

### Technologies Used in This Project

- **Express.js**: Even though Express is not being updated as frequently nowadays, I chose to use it because of its simplicity, which makes it great for writing MVPs quickly. Additionally, I already have experience with Express, which helps speed up development and reduces the learning curve.
- **PostgreSQL**: Chosen as the main relational database because it's straightforward to use and I've worked extensively with it in the past.
- **Prisma ORM**: Prisma is used as the database toolkit and ORM. It provides type-safe database access, easy migrations, and a great developer experience with autocompletion and schema validation.
- **pnpm**: Selected as the package manager for its speed compared to npm.
- **Podman**: Used instead of Docker because if free to use in corporative enviroments and I usually use in my routine.
- **Swagger (swagger-ui-express)**: Integrated for automatic API documentation, making it easy to explore and test endpoints directly from the browser.
- **Jest**: Used for unit and integration testing to ensure code reliability and correctness. Chosen because I used it in previous projects.
- **Biome**: A modern linter and formatter that helps maintain code quality and consistency. It was chosen because I was having issues with ESLint and Prettier, and Biome provides a unified solution for both linting and formatting, what worked well in this project.
- **Zod**: Used for schema validation, providing a type-safe way to validate request and response data. It integrates well with TypeScript and enhances the overall type safety of the API.
- **Pino**: Quick to setup and provides structured logging, which is essential for debugging and monitoring the API.

### Next Steps

- Implement rate limiting to prevent abuse of the API.
- Add more tests, to cover infrastructure layer for example.
- Implement a more robust error handling mechanism.
- Send token a notification service as an email or SMS.
