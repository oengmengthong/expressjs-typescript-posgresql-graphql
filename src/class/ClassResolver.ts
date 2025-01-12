import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { ClassService } from "./ClassService";
import { ClassType } from "./ClassTypes";

@Resolver()
export class ClassResolver {
  @Query(() => [ClassType])
  async classes(): Promise<ClassType[]> {
    const classes = await ClassService.getAllClasses();
    return classes.map((cls: ClassType) => ({
      ...cls,
      students: cls.students.map((student) => ({
        ...student,
        classId: cls.id,
      })),
    }));
  }

  @Mutation(() => ClassType)
  async createClass(
    @Arg("name") name: string,
    @Arg("description", { nullable: true }) description?: string // Add this line
  ): Promise<ClassType> {
    return ClassService.createClass(name, description);
  }
}