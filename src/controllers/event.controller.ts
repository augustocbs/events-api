import { Request, Response } from 'express';
import dataSource from '../config/typeorm.config';
import { Event } from '../entities/event.entity';
import { Participant } from '../entities/participant.entity';

export const eventController = {
  // POST /events
  async create(req: Request, res: Response) {
    try {
      const { name, description, date } = req.body;
      const event = dataSource.getRepository(Event).create({ name, description, date });
      const result = await dataSource.getRepository(Event).save(event);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  },

  // POST /events/:eventId/participants
  async addParticipant(req: Request, res: Response) {
    try {
      const { eventId } = req.params;
      const { participantId } = req.body;

      const event = await dataSource.getRepository(Event).findOne({
        where: { id: Number(eventId) },
        relations: ['participants'],
      });

      if (!event) {
        return res.status(404).json({ message: 'Evento não encontrado' });
      }

      const participant = await dataSource.getRepository(Participant).findOne({
        where: { id: participantId },
      });

      if (!participant) {
        return res.status(404).json({ message: 'Participante não encontrado' });
      }

      event.participants = event.participants || [];
      event.participants.push(participant);
      await dataSource.getRepository(Event).save(event);

      return res.status(200).json({ message: 'Participante adicionado ao evento' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  },

  // GET /events/:eventId/participants
  async listParticipants(req: Request, res: Response) {
    try {
      const { eventId } = req.params;
      const event = await dataSource.getRepository(Event).findOne({
        where: { id: Number(eventId) },
        relations: ['participants'],
      });

      if (!event) {
        return res.status(404).json({ message: 'Evento não encontrado' });
      }

      return res.status(200).json(event.participants);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  },
};
