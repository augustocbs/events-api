import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Event } from '../entities/event.entity';
import { Participant } from '../entities/participant.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'events_db',
  entities: [Event, Participant],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
});

export default dataSource;
