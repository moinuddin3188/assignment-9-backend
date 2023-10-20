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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getMyProfile = (authId, authRole) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findFirst({
        where: {
            id: authId,
            role: authRole,
        },
        include: {
            employee: true,
        },
    });
    return result;
});
const updateUserProfile = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findFirst({ where: { id } });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't Exist");
    }
    if (data.password)
        delete data.password;
    if (data.role)
        delete data.role;
    const result = yield prisma_1.default.user.update({
        where: {
            id,
            role: user_1.ENUM_USER_ROLE.USER,
        },
        data: data,
    });
    return result;
});
const updateAdminProfile = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findFirst({ where: { id } });
    console.log(data);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Admin doesn't Exist");
    }
    if (data.password)
        delete data.password;
    if (data.role)
        delete data.role;
    const result = yield prisma_1.default.user.update({
        where: {
            id,
            role: user_1.ENUM_USER_ROLE.ADMIN,
        },
        data: data,
    });
    console.log(result);
    return result;
});
const updateSuperAdminProfile = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findFirst({ where: { id } });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Super Admin doesn't Exist");
    }
    if (data.password)
        delete data.password;
    if (data.role)
        delete data.role;
    const result = yield prisma_1.default.user.update({
        where: {
            id,
            role: user_1.ENUM_USER_ROLE.SUPER_ADMIN,
        },
        data: data,
    });
    return result;
});
const updateEmployeeProfile = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
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
    if (user === null || user === void 0 ? void 0 : user.password)
        delete user.password;
    if (user === null || user === void 0 ? void 0 : user.role)
        delete user.role;
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
exports.ProfileService = {
    getMyProfile,
    updateUserProfile,
    updateAdminProfile,
    updateSuperAdminProfile,
    updateEmployeeProfile,
};
