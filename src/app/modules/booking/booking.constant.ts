export const bookingFilterableFields: string[] = [
  'searchTerm',
  'status',
  'bookingDate',
];

export const bookingSearchableFields: string[] = ['address'];

export const bookingRelationalFields: string[] = ['serviceId'];

export const bookingRelationalFieldsMapper: { [key: string]: string } = {
  serviceId: 'service',
};

export const bookingStatus: string[] = [
  'PENDING',
  'CONFIRMED',
  'CANCELED',
  'COMPLETED',
];
