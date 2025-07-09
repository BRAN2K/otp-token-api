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

3. Set up environment variables

```bash
cp docs/.env.example .env
# Edit .env with your configuration
```

4. Start the database

```bash
podman compose -p otp-token-api -f docker/docker-compose.db.yaml --env-file=.env up -d
```

5. Generate Prisma client

```bash
npx prisma generate
```

`OR`

````bash

6. Push database schema

```bash
npx prisma db push
````

7. Start the development server

```bash
pnpm run dev
```

The API will be available at `http://localhost:8080` by default.

## Database Management

You can use DataGrip or any other database management tool to connect to the PostgreSQL database, using same values as in the `.env` file that you configured.

`OR`

You can use the Prisma CLI to manage the database:

```bash
npx prisma studio
```

## Notes

\#TODO Write about my choices along the project, such as why express, postgres, architecture, etc.
