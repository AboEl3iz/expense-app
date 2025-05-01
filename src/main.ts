import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { DataSource } from 'typeorm';
import * as pgSession from 'connect-pg-simple';
import { Pool } from 'pg';
const passport = require('passport');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PgSessionStore = pgSession(session);
  const pool = new Pool({
    user: 'postgres', // Replace with your DB credentials
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB, // Your DB name
    password: process.env.POSTGRES_PASSWORD, // Your DB password
    port: 5432,
  });
  app.use(
    session({
      store: new PgSessionStore({ pool, // Reuse pg pool from TypeORM
        tableName: 'session', }),
      secret: 'sessionkarim2003',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60 * 60 * 1000 * 24 },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
