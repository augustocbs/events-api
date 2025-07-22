import { Repository } from 'typeorm';
import dataSource from '../config/typeorm.config';
import { Participant } from '../entities/participant.entity';

export class ParticipantService {
  private participantRepository: Repository<Participant>;

  constructor() {
    this.participantRepository = dataSource.getRepository(Participant);
  }

  async create(participantData: { name: string; email: string; phone: string }) {
    const participant = this.participantRepository.create(participantData);
    return await this.participantRepository.save(participant);
  }
}
