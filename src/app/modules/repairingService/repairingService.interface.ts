export type IServiceFilter = {
    searchTerm?: string | undefined;
    status?: string | undefined;
    tags?: string[] | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}