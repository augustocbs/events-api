import express from 'express';
import cors from 'cors';
import eventRoutes from './modules/event/routes/events';
import participantRoutes from './modules/participant/routes/participants';

const app = express();

app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true
}));

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

export default app;
