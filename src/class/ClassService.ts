import { AppDataSource } from "../database/data-source";
import { Class } from "./ClassEntity";
import { ClassType } from "./ClassTypes";

export class ClassService {
  private static classRepository = AppDataSource.getRepository(Class);

  static async getAllClasses(): Promise<ClassType[]> {
    const classes = await this.classRepository.find({
      relations: ["students"],
    });
    return classes.map((cls) => ({
      id: cls.id,
      name: cls.name,
      description: cls.description,
      students: cls.students.map((student) => ({
        id: student.id,
        name: student.name,
        age: student.age,
        classId: student.class.id,
      })),
    }));
  }

  static async createClass(
    name: string,
    description?: string
  ): Promise<ClassType> {
    try {
      const newClass = this.classRepository.create({ name, description });
      const savedClass = await this.classRepository.save(newClass);

      return {
        id: savedClass.id,
        name: savedClass.name,
        description: savedClass.description,
        students: [],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to create class: ${errorMessage}`);
    }
  }
}
