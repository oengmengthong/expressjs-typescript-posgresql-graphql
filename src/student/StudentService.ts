import { AppDataSource } from "../database/data-source";
import { Student } from "./StudentEntity";
import { StudentType } from "./StudentTypes";
import { Class } from "../class/ClassEntity";

export class StudentService {
  static async getAllStudents(): Promise<StudentType[]> {
    const studentRepo = AppDataSource.getRepository(Student);
    const students = await studentRepo.find({ relations: ["class"] });

    return students.map((student) => ({
      id: student.id,
      name: student.name,
      age: student.age,
      classId: student.class.id,
    }));
  }

  static async createStudent(name: string, age: number, classId: string): Promise<StudentType> {
    const studentRepo = AppDataSource.getRepository(Student);
    const classRepo = AppDataSource.getRepository(Class);

    // Validate classId
    const classEntity = await classRepo.findOneBy({ id: classId });
    if (!classEntity) {
      throw new Error(`Class with ID ${classId} not found.`);
    }

    const newStudent = studentRepo.create({ name, age, class: classEntity });
    const savedStudent = await studentRepo.save(newStudent);

    return {
      id: savedStudent.id,
      name: savedStudent.name,
      age: savedStudent.age,
      classId: classEntity.id,
    };
  }
}