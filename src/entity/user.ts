import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/** User entity */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    firstName!: string;

  @Column()
    lastName!: string;

  @Column()
    isActive!: boolean;

  @Column()
    emailId!: string;
}
