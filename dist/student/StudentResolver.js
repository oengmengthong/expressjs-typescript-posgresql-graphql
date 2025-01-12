"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.StudentResolver = void 0;
const type_graphql_1 = require("type-graphql");
const StudentService_1 = require("./StudentService");
const StudentTypes_1 = require("./StudentTypes");
let StudentResolver = class StudentResolver {
    students() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield StudentService_1.StudentService.getAllStudents();
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch students: ${error.message}`);
                }
                else {
                    throw new Error("Failed to fetch students: unknown error");
                }
            }
        });
    }
    createStudent(name, age, classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield StudentService_1.StudentService.createStudent(name, age, classId);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to create student: ${error.message}`);
                }
                else {
                    throw new Error("Failed to create student: unknown error");
                }
            }
        });
    }
};
exports.StudentResolver = StudentResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [StudentTypes_1.StudentType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "students", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => StudentTypes_1.StudentType),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __param(1, (0, type_graphql_1.Arg)("age")),
    __param(2, (0, type_graphql_1.Arg)("classId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "createStudent", null);
exports.StudentResolver = StudentResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], StudentResolver);
