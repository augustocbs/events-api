import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Participant } from '../../participant/entities/participant.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @ManyToMany(() => Participant)
  @JoinTable({
    name: 'event_participants',
    joinColumn: {
      name: 'event_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'participant_id',
      referencedColumnName: 'id',
    },
  })
  participants: Participant[];
}
