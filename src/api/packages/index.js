import { applyPagination } from 'src/utils/apply-pagination';
import { deepCopy } from 'src/utils/deep-copy';
import { packages } from './data';

class PackagesApi {
  getPackages(request = {}) {
    const { filters, page, rowsPerPage } = request;

    let data = deepCopy(packages);
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter( (pack) => {
        if (typeof filters.name !== 'undefined' && filters.name !== '') {
          const nameMatched = pack.name.toLowerCase().includes(filters.name.toLowerCase());

          if (!nameMatched) {
            return false;
          }
        }

        // It is possible to select multiple category options
        if (typeof filters.category !== 'undefined' && filters.category.length > 0) {
          const categoryMatched = filters.category.includes(pack.category);

          if (!categoryMatched) {
            return false;
          }
        }

        // It is possible to select multiple status options
        if (typeof filters.status !== 'undefined' && filters.status.length > 0) {
          const statusMatched = filters.status.includes(pack.status);

          if (!statusMatched) {
            return false;
          }
        }

        // Present only if filter required
        if (typeof filters.inStock !== 'undefined') {
          const stockMatched = pack.inStock === filters.inStock;

          if (!stockMatched) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count
    });
  }
}

export const packagesApi = new PackagesApi();
