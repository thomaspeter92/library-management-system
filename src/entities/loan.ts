import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Book } from "./book";
import { User } from "./user";

@Entity()
export class Loan {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @ManyToOne(() => Book, (bookData) => bookData.id)
  @JoinColumn({ name: "book_id" })
  book_id: string;

  @Column()
  @ManyToOne(() => User, (userData) => userData.id)
  @JoinColumn({ name: "user_id" })
  user_id: string;

  @CreateDateColumn()
  loan_date: Date;

  @Column()
  return_date: Date;
}
