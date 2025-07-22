import { Repository } from 'typeorm';
import dataSource from '../config/typeorm.config';
import { Event } from '../entities/event.entity';
import { Participant } from '../entities/participant.entity';

export class EventService {
  private eventRepository: Repository<Event>;
  private participantRepository: Repository<Participant>;

  constructor() {
    this.eventRepository = dataSource.getRepository(Event);
    this.participantRepository = dataSource.getRepository(Participant);
  }

  async create(eventData: { name: string; description: string; date: Date }) {
    const event = this.eventRepository.create(eventData);
    return await this.eventRepository.save(event);
  }

  async addParticipant(eventId: number, participantId: number) {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['participants'],
    });

    if (!event) {
      throw new Error('Event not found');
    }

    const participant = await this.participantRepository.findOne({
      where: { id: participantId },
    });

    if (!participant) {
      throw new Error('Participant not found');
    }

    if (!event.participants) {
      event.participants = [];
    }

    event.participants.push(participant);
    return await this.eventRepository.save(event);
  }

  async getParticipants(eventId: number) {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['participants'],
    });

    if (!event) {
      throw new Error('Event not found');
    }

    return event.participants;
  }
}
