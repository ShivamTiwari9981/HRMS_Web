export interface PaginationRequest {
  pageNumber: number;
  pageSize: number;
  searchText?: string;
  sortColumn?: string;
  sortDirection?: string;
}