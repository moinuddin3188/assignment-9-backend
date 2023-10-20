"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("../user/user.constant");
const createEmployee = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.object({
            email: zod_1.z.string({
                required_error: 'Email is required',
            }),
            password: zod_1.z.string({
                required_error: 'password is required',
            }),
            firstName: zod_1.z.string({
                required_error: 'firstName is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'lastName is required',
            }),
            contactNo: zod_1.z.string({
                required_error: 'Contact Number is required',
            }),
            address: zod_1.z.string({
                required_error: 'Address is required',
            }),
            faceBookIdLink: zod_1.z.string().optional(),
            instaIdLink: zod_1.z.string().optional(),
            whatsAppNumber: zod_1.z.string().optional(),
            gender: zod_1.z.enum([...user_constant_1.gender], {
                required_error: 'Gender is required',
            }),
        }, {
            required_error: 'User is required',
        }),
        employee: zod_1.z.object({
            hireDate: zod_1.z.string({
                required_error: 'hireDate is required',
            }),
            emergencyContactNumber: zod_1.z.string({
                required_error: 'emergency Contact Number is required',
            }),
            salary: zod_1.z.number({
                required_error: 'Salary is required',
            }),
            dateOfBirth: zod_1.z.string().optional(),
        }, {
            required_error: 'Employee is required',
        }),
    }),
});
const updateEmployee = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z
            .object({
            email: zod_1.z.string().optional(),
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
            contactNo: zod_1.z.string().optional(),
            address: zod_1.z.string().optional(),
            faceBookIdLink: zod_1.z.string().optional(),
            instaIdLink: zod_1.z.string().optional(),
            whatsAppNumber: zod_1.z.string().optional(),
            gender: zod_1.z.enum([...user_constant_1.gender]).optional(),
        })
            .optional(),
        employee: zod_1.z
            .object({
            hireDate: zod_1.z.string().optional(),
            emergencyContactNumber: zod_1.z.string().optional(),
            salary: zod_1.z.number().optional(),
            dateOfBirth: zod_1.z.string().optional(),
        })
            .optional(),
    }),
});
exports.EmployeeValidation = {
    createEmployee,
    updateEmployee,
};
