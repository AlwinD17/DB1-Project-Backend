import { Repository, SelectQueryBuilder } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

export abstract class BasePaginationService<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async paginate(options: IPaginationOptions, queryBuilder: SelectQueryBuilder<T>): Promise<Pagination<T>> {
    return paginate<T>(queryBuilder, options);
  }

  applyFilters(queryBuilder: SelectQueryBuilder<T>, filters: Record<string, any>, mappings: Record<string, string>): void {
    for (const [filterKey, value] of Object.entries(filters)) {
      if (value !== undefined && mappings[filterKey]) {
        queryBuilder.andWhere(mappings[filterKey], { [filterKey]: value });
      }
    }
  }
}