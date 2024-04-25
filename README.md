# Description

## Run in development

1. Clone repository
2. Create file copy: `env.template` and rename it to `.env` and change the environment variable
3. Install dependencies `npm install`
4. Build database `docker compose up -d`
5. Run Prisma migrations `npx prisma migrate dev`
6. Execute seed `npm run seed`
7. Clean wrobser's localStorage
8. Run project `npm run dev`

## Run in production
