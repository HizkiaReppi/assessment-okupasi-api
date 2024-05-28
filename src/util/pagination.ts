export type PaginationPayload = {
  limit: number;
  page: number;
  totalResult: number;
  data: any[];
};

export class Pagination {
  readonly limit: number;
  readonly total_page: number;
  readonly total_result: number;
  readonly page: number;
  readonly data: any[];

  constructor(payload: PaginationPayload) {
    const {limit, page, totalResult, data} = payload;
    this.limit = limit;
    this.page = page;
    this.total_page = this.countTotalPage(totalResult, limit);
    this.total_result = totalResult;
    this.data = data;
  }

  private countTotalPage(totalResult: number, limit: number) {
    let total = Math.floor(totalResult / limit);
    if (totalResult % limit > 0) {
      total++;
    }

    return total;
  }
}

export function countOffset(page: number, limit: number) {
  return (page - 1) * limit;
}
