"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const repairingService_constant_1 = require("./repairingService.constant");
const createRepairingService = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is required',
        }),
        description: zod_1.z.string({
            required_error: 'description is required',
        }),
        price: zod_1.z.number({
            required_error: 'price is required',
        }),
        tags: zod_1.z.array(zod_1.z.string({
            required_error: 'Tag is required',
        }), {
            required_error: 'Tags are required',
        }),
        status: zod_1.z.enum([...repairingService_constant_1.serviceStatus]).optional(),
    }),
});
const updateRepairingService = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        tags: zod_1.z
            .array(zod_1.z.string({
            required_error: 'Tag is required',
        }))
            .optional(),
        status: zod_1.z.enum([...repairingService_constant_1.serviceStatus]).optional(),
    }),
});
exports.ServiceValidation = {
    createRepairingService,
    updateRepairingService,
};
