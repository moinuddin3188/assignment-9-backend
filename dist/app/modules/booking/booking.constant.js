"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingStatus = exports.bookingRelationalFieldsMapper = exports.bookingRelationalFields = exports.bookingSearchableFields = exports.bookingFilterableFields = void 0;
exports.bookingFilterableFields = [
    'searchTerm',
    'status',
    'bookingDate',
];
exports.bookingSearchableFields = ['address'];
exports.bookingRelationalFields = ['serviceId'];
exports.bookingRelationalFieldsMapper = {
    serviceId: 'service',
};
exports.bookingStatus = [
    'PENDING',
    'CONFIRMED',
    'CANCELED',
    'COMPLETED',
];
