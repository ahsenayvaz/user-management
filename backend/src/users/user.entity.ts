import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type Role = 'admin' | 'user';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  fullName: string;

  @Column({ type: 'varchar', default: 'user' })
  role: Role;
}
