"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const data_source_1 = require("../database/data-source");
const StudentEntity_1 = require("./StudentEntity");
const ClassEntity_1 = require("../class/ClassEntity");
class StudentService {
    static getAllStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            const studentRepo = data_source_1.AppDataSource.getRepository(StudentEntity_1.Student);
            const students = yield studentRepo.find({ relations: ["class"] });
            return students.map((student) => ({
                id: student.id,
                name: student.name,
                age: student.age,
                classId: student.class.id,
            }));
        });
    }
    static createStudent(name, age, classId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentRepo = data_source_1.AppDataSource.getRepository(StudentEntity_1.Student);
            const classRepo = data_source_1.AppDataSource.getRepository(ClassEntity_1.Class);
            // Validate classId
            const classEntity = yield classRepo.findOneBy({ id: classId });
            if (!classEntity) {
                throw new Error(`Class with ID ${classId} not found.`);
            }
            const newStudent = studentRepo.create({ name, age, class: classEntity });
            const savedStudent = yield studentRepo.save(newStudent);
            return {
                id: savedStudent.id,
                name: savedStudent.name,
                age: savedStudent.age,
                classId: classEntity.id,
            };
        });
    }
}
exports.StudentService = StudentService;
