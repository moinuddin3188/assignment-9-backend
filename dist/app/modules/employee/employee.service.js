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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const employee_constant_1 = require("./employee.constant");
const getSingleEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield prisma_1.default.user.findFirst({
        where: {
            id,
        },
        include: {
            employee: true,
        },
    });
    return employee;
});
const getAllEmployees = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: employee_constant_1.employeeSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                return {
                    [key]: {
                        equals: filterData[key],
                    },
                };
            }),
        });
    }
    const whereConditions = andConditions.length > 0
        ? { AND: [...andConditions, { role: user_1.ENUM_USER_ROLE.EMPLOYEE }] }
        : { role: user_1.ENUM_USER_ROLE.EMPLOYEE };
    const result = yield prisma_1.default.user.findMany({
        where: whereConditions,
        include: {
            employee: true,
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.user.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const updateEmployee = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findFirst({
        where: { id },
        include: {
            employee: true,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Employee doesn't Exist");
    }
    const { user, employee } = data;
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (user) {
            yield transactionClient.user.update({
                where: { id },
                data: user,
            });
        }
        if (employee) {
            yield transactionClient.employee.update({
                where: { id: (_a = isExist.employee) === null || _a === void 0 ? void 0 : _a.id },
                data: employee,
            });
        }
        return true;
    }));
    if (result) {
        const response = yield prisma_1.default.user.findFirst({
            where: {
                id,
            },
            include: {
                employee: true,
            },
        });
        return response;
    }
});
const deleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findFirst({
        where: { id },
        include: {
            employee: true,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Employee doesn't Exist");
    }
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const deletedUser = yield transactionClient.user.delete({
            where: { id },
        });
        yield transactionClient.employee.delete({
            where: { id: (_b = isExist.employee) === null || _b === void 0 ? void 0 : _b.id },
        });
        return deletedUser;
    }));
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete');
    }
    return result;
});
exports.EmployeeService = {
    getAllEmployees,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee,
};
