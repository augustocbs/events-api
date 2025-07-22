import 'reflect-metadata';
import express from 'express';
import { config } from 'dotenv';
import dataSource from './config/typeorm.config';
import eventRoutes from './routes/events';
import participantRoutes from './routes/participants';

config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use('/events', eventRoutes);
app.use('/participants', participantRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

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
