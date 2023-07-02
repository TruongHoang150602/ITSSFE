import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';
import { employee, employees, emails, invoices, logs } from './data';

class EmployeesApi {
  constructor() {
    this.data = deepCopy(employees);
  }

  getEmployees(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = this.data.slice();
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((employee) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          let queryMatched = false;
          const properties = ['email', 'name'];

          properties.forEach((property) => {
            if (employee[property].toLowerCase().includes(filters.query.toLowerCase())) {
              queryMatched = true;
            }
          });

          if (!queryMatched) {
            return false;
          }
        }

        if (typeof filters.role !== 'undefined') {
          if (employee.role !== filters.role) {
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

  getEmployeeById(request) {
    const { id } = request;
    console.log(this.data)
    const employee = this.data.find((emp) => emp.id == id);
    return Promise.resolve(employee);
  }

  deleteEmployeeById(id) {
    const index = this.data.findIndex((emp) => emp.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  updateEmployeeById(id, newData) {
    const index = this.data.findIndex((emp) => emp.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...newData };
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

}

export const employeesApi = new EmployeesApi();
