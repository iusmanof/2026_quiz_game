export class PaginatedViewDto<T> {
  items: T[];
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
}
