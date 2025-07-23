import 'reflect-metadata';
import { config } from 'dotenv';
import app from './app';
import dataSource from './config/typeorm.config';

config();

const PORT = process.env.PORT || 3000;

dataSource.initialize()
  .then(() => {
    console.log('Database initialized');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error initializing database:', error);
    process.exit(1);
  });
