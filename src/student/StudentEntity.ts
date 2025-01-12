import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Class } from "../class/ClassEntity";

@Entity()
export class Student {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "int" })
  age!: number;

  @ManyToOne(() => Class, (cls) => cls.students, { onDelete: "CASCADE", eager: true })
  class!: Class;
}