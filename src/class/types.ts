
export interface ClassType {
  id: number;
  name: string;
  students: Array<any>; // Replace 'any' with your Student type if available
  createdAt?: Date;
  updatedAt?: Date;
}