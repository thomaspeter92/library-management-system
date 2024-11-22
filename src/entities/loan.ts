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

  @Column({ nullable: false })
  @ManyToOne(() => Book, (bookData) => bookData.id)
  @JoinColumn({ name: "book_id" })
  book_id: string;

  @Column({ nullable: false })
  @ManyToOne(() => User, (userData) => userData.id)
  @JoinColumn({ name: "user_id" })
  user_id: string;

  @CreateDateColumn()
  loan_date: Date;

  @Column({ nullable: true })
  return_date: Date;

  @Column({ type: "timestamp", default: () => "NOW() + INTERVAL '3 weeks'" })
  due_date: Date;
}
