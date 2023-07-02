import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';
import { user, users, emails, invoices, logs } from './data';

class UsersApi {
  async getUsers(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;
    let data = null;
    try {
      const response = await fetch('/user/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      data = await response.json();
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
      throw error;
    }

    
    data = deepCopy(data);
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

        if (typeof filters.member !== 'undefined') {
          if (user.role !== filters.member) {
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
