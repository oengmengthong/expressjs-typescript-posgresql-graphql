import { ObjectType, Field, ID, Int } from "type-graphql";

@ObjectType()
export class StudentType {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => Int) // Specify Int for age
  age!: number;

  @Field(() => ID)
  classId!: string;
}