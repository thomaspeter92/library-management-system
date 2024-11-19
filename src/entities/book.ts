import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, unique: false })
  title: string;

  @Column({ nullable: true, unique: false })
  subtitle: string;

  @Column({ nullable: true, unique: false })
  authors: string;

  @Column({ nullable: true, unique: false })
  genre: string;

  @Column({ nullable: true, unique: false })
  thumbnail: string;

  @Column({ nullable: true, unique: false })
  description: string;

  @Column({ nullable: true, unique: false })
  year: string;

  @Column({ nullable: true, unique: false })
  rating: string;

  @Column({ nullable: true, unique: false })
  pages: string;

  @Column({ nullable: true, unique: false })
  ratings_count: string;
}
