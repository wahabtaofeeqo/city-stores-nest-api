import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Timestamp,
  } from 'typeorm';
  
  @Entity({ name: 'password_reset_codes' })
  export class PasswordReset {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    code: string;
  
    @CreateDateColumn()
    created_at: Timestamp;
  
    @UpdateDateColumn()
    updated_at: Timestamp;
  }
  