import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100, nullable: false, unique: false })
  title: string;

  @Column({ length: 100, nullable: true, unique: false })
  subtitle: string;

  @Column({ length: 100, nullable: false, unique: false })
  authors: string;

  @Column({ length: 100, nullable: false, unique: false })
  genre: string;

  @Column({ nullable: false, unique: false })
  thumbnail: string;

  @Column({ nullable: false, unique: false })
  description: string;

  @Column({ nullable: false, unique: false })
  year: number;

  @Column({ nullable: false, unique: false })
  rating: number;

  @Column({ nullable: false, unique: false })
  pages: number;

  @Column({ nullable: false, unique: false })
  ratings_count: number;
}
