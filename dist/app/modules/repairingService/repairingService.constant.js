"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceStatus = exports.serviceRelationalFieldsMapper = exports.serviceRelationalFields = exports.serviceSearchableFields = exports.serviceFilterableFields = void 0;
exports.serviceFilterableFields = [
    'searchTerm',
    'status',
    'tags',
    'minPrice',
    'maxPrice',
    'categoryId',
];
exports.serviceSearchableFields = [
    'title',
    'description',
];
exports.serviceRelationalFields = ['categoryId'];
exports.serviceRelationalFieldsMapper = {
    serviceId: 'category',
};
exports.serviceStatus = [
    'COMING_SOON',
    'AVAILABLE',
    'NOT_AVAILABLE',
];
