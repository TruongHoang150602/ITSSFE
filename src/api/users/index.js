import { applyPagination } from '../../utils/apply-pagination';
import { applySort } from '../../utils/apply-sort';
import { deepCopy } from '../../utils/deep-copy';
import { user, users, emails, invoices, logs } from './data';

class UsersApi {
  getUsers(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = deepCopy(users);
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((user) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          let queryMatched = false;
          const properties = ['email', 'name'];

          properties.forEach((property) => {
            if ((user[property]).toLowerCase().includes(filters.query.toLowerCase())) {
              queryMatched = true;
            }
          });

          if (!queryMatched) {
            return false;
          }
        }

        if (typeof filters.hasAcceptedMarketing !== 'undefined') {
          if (user.hasAcceptedMarketing !== filters.hasAcceptedMarketing) {
            return false;
          }
        }

        if (typeof filters.isProspect !== 'undefined') {
          if (user.isProspect !== filters.isProspect) {
            return false;
          }
        }

        if (typeof filters.isReturning !== 'undefined') {
          if (user.isReturning !== filters.isReturning) {
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

  getUser(request) {
    return Promise.resolve(deepCopy(user));
  }

  getEmails(request) {
    return Promise.resolve(deepCopy(emails));
  }

  getInvoices(request) {
    return Promise.resolve(deepCopy(invoices));
  }

  getLogs(request) {
    return Promise.resolve(deepCopy(logs));
  }
}

export const usersApi = new UsersApi();
