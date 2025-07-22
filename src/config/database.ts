import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Event } from '../entities/event.entity';
import { Participant } from '../entities/participant.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Event, Participant],
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
});
