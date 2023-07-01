import { register, registers } from './data';
import { deepCopy } from 'src/utils/deep-copy';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';

class RegistersApi {
  getRegisters(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = deepCopy(registers);
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((register) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          // Checks only the register number, but can be extended to support other fields, such as customer
          // name, email, etc.
          const containsQuery = (register.number || '')
            .toLowerCase()
            .includes(filters.query.toLowerCase());

          if (!containsQuery) {
            return false;
          }
        }

        if (typeof filters.status !== 'undefined') {
          const statusMatched = register.status === filters.status;

          if (!statusMatched) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count
    });
  }

  getRegister(request = {}) {
    return Promise.resolve(deepCopy(register));
  }
}

export const registersApi = new RegistersApi();
