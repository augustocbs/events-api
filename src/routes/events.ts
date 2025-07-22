import { Router, Request, Response } from 'express';
import dataSource from '../config/typeorm.config';
import { Event } from '../entities/event.entity';
import { Participant } from '../entities/participant.entity';

const router = Router();

// Criar evento
router.post('/', async (req: Request<{}, {}, { name: string; description: string; date: string }>, res: Response) => {
    try {
      const eventRepository = dataSource.getRepository(Event);
      const event = eventRepository.create(req.body);
      const savedEvent = await eventRepository.save(event);
      return res.status(201).json(savedEvent);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      return res.status(500).json({ message: 'Erro interno' });
    }
});

// Listar participantes de um evento
router.get('/:eventId/participants', async (req: Request<{ eventId: string }>, res: Response) => {
    try {
      const eventRepository = dataSource.getRepository(Event);
      const event = await eventRepository.findOne({
        where: { id: Number(req.params.eventId) },
        relations: ['participants'],
      });

      if (!event) {
        return res.status(404).json({ message: 'Evento não encontrado' });
      }

      return res.json(event.participants);
    } catch (error) {
      console.error('Erro ao listar participantes:', error);
      return res.status(500).json({ message: 'Erro interno' });
    }
});

// Adicionar participante a um evento
router.post('/:eventId/participants', async (req: Request<{ eventId: string }, {}, { participantId: number }>, res: Response) => {
    try {
      const eventRepository = dataSource.getRepository(Event);
      const participantRepository = dataSource.getRepository(Participant);
      
      const event = await eventRepository.findOne({
        where: { id: Number(req.params.eventId) },
        relations: ['participants'],
      });

      if (!event) {
        return res.status(404).json({ message: 'Evento não encontrado' });
      }

      const participant = await participantRepository.findOne({
        where: { id: req.body.participantId },
      });

      if (!participant) {
        return res.status(404).json({ message: 'Participante não encontrado' });
      }

      if (!event.participants) {
        event.participants = [];
      }

      if (event.participants.some((p: Participant) => p.id === participant.id)) {
        return res.status(400).json({ message: 'Participante já registrado neste evento' });
      }

      event.participants.push(participant);
      await eventRepository.save(event);

      return res.status(201).json({ message: 'Participante adicionado' });
    } catch (error) {
      console.error('Erro ao adicionar participante:', error);
      return res.status(500).json({ message: 'Erro interno' });
    }
});

export default router;
