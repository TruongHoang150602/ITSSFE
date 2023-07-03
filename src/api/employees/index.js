import axios from 'axios';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';
class EmployeesApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getEmployees(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;
    let data = null;
    try {
      const response = await axios.get(`${this.baseUrl}/employee`);
      data =  response.data;
    } catch (error) {
      console.error('Error while fetching employees:', error);
      return [];
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

  async getEmployeeById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/employee/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while fetching employee with ID ${id}:`, error);
      return null;
    }
  }

  async createEmployee(newEmployee) {
    try {
      const response = await axios.post(`${this.baseUrl}/employee`, newEmployee);
      return response.data;
    } catch (error) {
      console.error('Error while creating employee:', error);
      return null;
    }
  }

  async updateEmployeeById(id, updatedEmployee) {
    try {
      const response = await axios.put(`${this.baseUrl}/employee/${id}`, updatedEmployee);
      return response.data;
    } catch (error) {
      console.error(`Error while updating employee with ID ${id}:`, error);
      return null;
    }
  }

  async deleteEmployeeById(id) {
    try {
      const response = await axios.delete(`${this.baseUrl}/employee/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while deleting employee with ID ${id}:`, error);
      return false;
    }
  }
}

const employeesApi = new EmployeesApi('https://64a180530079ce56e2db23e8.mockapi.io/user');

export default employeesApi;
