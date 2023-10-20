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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const user_constant_1 = require("./user.constant");
const user_utils_1 = require("./user.utils");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, user_utils_1.hashPassword)(data.password);
    data['password'] = hashedPassword;
    data['role'] = user_1.ENUM_USER_ROLE.USER;
    const result = yield prisma_1.default.user.create({
        data,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create User');
    }
    // eslint-disable-next-line no-unused-vars
    const { password } = result, others = __rest(result, ["password"]);
    return others;
});
const createAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, user_utils_1.hashPassword)(data.password);
    data['password'] = hashedPassword;
    data['role'] = user_1.ENUM_USER_ROLE.ADMIN;
    const newAdmin = yield prisma_1.default.user.create({
        data,
    });
    if (!newAdmin) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Admin');
    }
    // eslint-disable-next-line no-unused-vars
    const { password } = newAdmin, others = __rest(newAdmin, ["password"]);
    return others;
});
const createSuperAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, user_utils_1.hashPassword)(data.password);
    data['password'] = hashedPassword;
    data['role'] = user_1.ENUM_USER_ROLE.SUPER_ADMIN;
    const newAdmin = yield prisma_1.default.user.create({
        data,
    });
    if (!newAdmin) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create super Admin');
    }
    // eslint-disable-next-line no-unused-vars
    const { password } = newAdmin, others = __rest(newAdmin, ["password"]);
    return others;
});
const createEmployee = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, employee } = data;
    const hashedPassword = yield (0, user_utils_1.hashPassword)(user.password);
    user['password'] = hashedPassword;
    user.role = user_1.ENUM_USER_ROLE.EMPLOYEE;
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield transactionClient.user.create({
            data: user,
        });
        if (!newUser) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create User');
        }
        employee.userId = newUser.id;
        const newEmployee = yield transactionClient.employee.create({
            data: employee,
        });
        if (!newEmployee) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Employee');
        }
        return newUser;
    }));
    if (result) {
        const response = yield prisma_1.default.user.findFirst({
            where: {
                id: result.id,
            },
            include: {
                employee: true,
            },
        });
        return response;
    }
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: {
            id,
            role: user_1.ENUM_USER_ROLE.USER,
        },
    });
    return user;
});
const getAllUsers = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: user_constant_1.userSearchableFields.map(field => ({
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
        ? { AND: [...andConditions, { role: user_1.ENUM_USER_ROLE.USER }] }
        : { role: user_1.ENUM_USER_ROLE.USER };
    const result = yield prisma_1.default.user.findMany({
        where: Object.assign({}, whereConditions),
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.user.count({
        where: Object.assign(Object.assign({}, whereConditions), { role: user_1.ENUM_USER_ROLE.USER }),
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
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findFirst({ where: { id } });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't Exist");
    }
    const result = yield prisma_1.default.user.update({
        where: {
            id,
            role: user_1.ENUM_USER_ROLE.USER,
        },
        data: data,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.delete({
        where: {
            id,
        },
    });
    return user;
});
exports.UserService = {
    createUser,
    createAdmin,
    createSuperAdmin,
    createEmployee,
    getSingleUser,
    getAllUsers,
    updateUser,
    deleteUser,
};
