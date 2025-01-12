import { ObjectType, Field, ID } from "type-graphql";
import { StudentType } from "../student/StudentTypes";

@ObjectType()
export class ClassType {
  @Field(() => ID)
  id!: string; // Changed to string to match UUID

  @Field()
  name!: string;

  @Field({ nullable: true }) // Add this line
  description?: string;

  @Field(() => [StudentType])
  students!: StudentType[];
}

// Interface for internal use (optional if not needed)
export interface ClassType {
  id: string; // Ensure it matches ClassType's ID type
  name: string;
  description?: string;
  students: StudentType[];
  createdAt?: Date;
  updatedAt?: Date;
}