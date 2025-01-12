import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { StudentService } from "./StudentService";
import { StudentType } from "./StudentTypes";

@Resolver()
export class StudentResolver {
  @Query(() => [StudentType])
  async students(): Promise<StudentType[]> {
    try {
      return await StudentService.getAllStudents();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch students: ${error.message}`);
      } else {
        throw new Error("Failed to fetch students: unknown error");
      }
    }
  }

  @Mutation(() => StudentType)
  async createStudent(
    @Arg("name") name: string,
    @Arg("age", () => Int) age: number,
    @Arg("classId") classId: string
  ): Promise<StudentType> {
    try {
      return await StudentService.createStudent(name, age, classId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create student: ${error.message}`);
      } else {
        throw new Error("Failed to create student: unknown error");
      }
    }
  }
}