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
exports.ClassResolver = void 0;
const type_graphql_1 = require("type-graphql");
const ClassService_1 = require("./ClassService");
const ClassTypes_1 = require("./ClassTypes");
let ClassResolver = class ClassResolver {
    classes() {
        return __awaiter(this, void 0, void 0, function* () {
            const classes = yield ClassService_1.ClassService.getAllClasses();
            return classes.map((cls) => (Object.assign(Object.assign({}, cls), { students: cls.students.map((student) => (Object.assign(Object.assign({}, student), { classId: cls.id }))) })));
        });
    }
    createClass(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return ClassService_1.ClassService.createClass(name);
        });
    }
};
exports.ClassResolver = ClassResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [ClassTypes_1.ClassType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "classes", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ClassTypes_1.ClassType),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "createClass", null);
exports.ClassResolver = ClassResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ClassResolver);
