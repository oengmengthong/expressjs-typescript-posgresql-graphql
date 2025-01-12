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
exports.ClassService = void 0;
const data_source_1 = require("../database/data-source");
const ClassEntity_1 = require("./ClassEntity");
class ClassService {
    static getAllClasses() {
        return __awaiter(this, void 0, void 0, function* () {
            const classes = yield this.classRepository.find({ relations: ["students"] });
            return classes.map((cls) => ({
                id: cls.id,
                name: cls.name,
                students: cls.students.map((student) => ({
                    id: student.id,
                    name: student.name,
                    age: student.age,
                    classId: student.class.id,
                })),
            }));
        });
    }
    static createClass(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newClass = this.classRepository.create({ name });
                const savedClass = yield this.classRepository.save(newClass);
                return {
                    id: savedClass.id,
                    name: savedClass.name,
                    students: [],
                };
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                throw new Error(`Failed to create class: ${errorMessage}`);
            }
        });
    }
}
exports.ClassService = ClassService;
ClassService.classRepository = data_source_1.AppDataSource.getRepository(ClassEntity_1.Class);
