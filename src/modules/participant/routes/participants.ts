import { Router, Request, Response } from 'express';
import dataSource from '../../../config/typeorm.config';
import { Participant } from '../entities/participant.entity';

const router = Router();

// Criar participante
router.post('/', async (req: Request<{}, {}, { name: string; email: string; phone: string }>, res: Response) => {
    try {
      const participantRepository = dataSource.getRepository(Participant);
      const participant = participantRepository.create(req.body);
      const savedParticipant = await participantRepository.save(participant);
      return res.status(201).json(savedParticipant);
    } catch (error) {
      console.error('Error creating participant:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
