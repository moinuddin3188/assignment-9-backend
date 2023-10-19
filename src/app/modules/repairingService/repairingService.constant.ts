export const serviceFilterableFields: string[] = [
  'searchTerm',
  'status',
  'tags',
  'minPrice',
  'maxPrice',
  'categoryId',
];

export const serviceSearchableFields: string[] = [
  'title',
  'description',
];

export const serviceRelationalFields: string[] = ['categoryId'];

export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  serviceId: 'category',
};

export const serviceStatus: string[] = [
  'COMING_SOON',
  'AVAILABLE',
  'NOT_AVAILABLE',
];
