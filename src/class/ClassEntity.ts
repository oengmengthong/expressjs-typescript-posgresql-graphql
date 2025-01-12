import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Student } from "../student/StudentEntity";

@Entity()
export class Class {
  @PrimaryGeneratedColumn("uuid") // Keep as a string (UUID)
  id!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ nullable: true }) // Add this line
  description?: string;

  @OneToMany(() => Student, (student) => student.class)
  students!: Student[];
}