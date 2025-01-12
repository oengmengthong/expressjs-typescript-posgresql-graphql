Postman Collection: https://documenter.getpostman.com/view/5432805/2sAYQWKtDK

# Class Student Management System

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Project Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd class-student-management
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
```bash
# Copy example env file
cp .env.example .env

# Edit .env file with your database credentials
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=student_management
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
```

### 4. Database Setup
```bash
# Create database
createdb student_management

# Run initial migrations
npm run migration:run
```

### 5. Start Development Server
```bash
# Start in development mode
npm run dev

# Start in production mode
npm run build
npm start
```

### 6. API Testing
The API will be available at `http://localhost:3000`

Test endpoints using curl or Postman:
```bash
# Test API health
curl http://localhost:3000/health

# Get all classes
curl http://localhost:3000/api/classes
```

## Available Scripts
- `npm run dev`: Start development server with hot reload
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run migration:generate -- path/to/migration`: Generate new migration
- `npm run migration:run`: Run pending migrations
- `npm run migration:revert`: Revert last migration
- `npm test`: Run tests

# Database Migration Guide

## Scenario
1. Adding a description field to the Class table
2. Migrating student data from Student table to a new table called StudentDetails

## 1. Adding New Fields to Existing Tables

### 1.1 Modify Entity
Modify `ClassEntity.ts` to add the description field:

```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Student } from "../student/StudentEntity";

@Entity()
export class Class {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "text", nullable: true }) // New field
  description?: string;

  @OneToMany(() => Student, (student) => student.class)
  students!: Student[];
}
```

### 1.2 Generate Migration
Generate a migration for the description field:
```bash
npm run migration:generate -- ./src/migrations/AddDescriptionToClass
```

### 1.3 Review Generated Migration
Review the generated file in `src/migrations/AddDescriptionToClass.ts`:

```typescript
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionToClass implements MigrationInterface {
  name = "AddDescriptionToClass";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "class" ADD "description" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "description"`);
  }
}
```

### 1.4 Apply Migration
Run the migration:
```bash
npm run migration:run
```

### 1.5 Verify Changes
* Check your database to ensure the description column was added
* Test the application to ensure the new field works as expected

## 2. Migrating Data Between Tables

### 2.1 Define New Entity
Create `StudentDetailsEntity.ts`:

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class StudentDetails {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "int" })
  age!: number;

  @Column({ type: "uuid" })
  classId!: string;
}
```

### 2.2 Generate Migration
```bash
npm run migration:generate -- ./src/migrations/CreateStudentDetailsTable
```

### 2.3 Review Generated Migration
```typescript
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStudentDetailsTable implements MigrationInterface {
  name = "CreateStudentDetailsTable";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "student_details" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" varchar(100) NOT NULL,
        "age" int NOT NULL,
        "classId" uuid NOT NULL,
        PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "student_details"`);
  }
}
```

### 2.4 Apply Migration
```bash
npm run migration:run
```

### 2.5 Migrate Data
Generate data migration:
```bash
npm run migration:generate -- ./src/migrations/MigrateStudentDataToStudentDetails
```

Modify the generated migration file:
```typescript
import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateStudentDataToStudentDetails implements MigrationInterface {
  name = "MigrateStudentDataToStudentDetails";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO student_details (id, name, age, classId)
      SELECT id, name, age, "classId" FROM student
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO student (id, name, age, "classId")
      SELECT id, name, age, classId FROM student_details
    `);
  }
}
```

### 2.6 Apply Data Migration
```bash
npm run migration:run
```
