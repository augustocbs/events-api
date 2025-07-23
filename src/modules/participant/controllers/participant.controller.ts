import { Request, Response } from 'express';
import dataSource from '../../../config/typeorm.config';
import { Participant } from '../entities/participant.entity';

export const participantController = {
  // POST /participants
  async create(req: Request, res: Response) {
    try {
      const { name, email, phone } = req.body;
      const participant = dataSource.getRepository(Participant).create({ name, email, phone });
      const result = await dataSource.getRepository(Participant).save(participant);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  },
};
