import axios from 'axios';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';
class UsersApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;
    let data = null;
    try {
      const response = await axios.get(`${this.baseUrl}/users`);
      data =  response.data;
    } catch (error) {
      console.error('Error while fetching users:', error);
      window.location.href = '/500';
      return null;
    }
    data = deepCopy(data);
    data = data.filter((option) => option.role === 'user' || option.role === 'member' );
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((user) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          let queryMatched = false;
          const properties = ['email', 'first_name', 'last_name'];

          properties.forEach((property) => {
            if ((user[property]).toLowerCase().includes(filters.query.toLowerCase())) {
              queryMatched = true;
            }
          });

          if (!queryMatched) {
            return false;
          }
        }

        if (typeof filters.role !== 'undefined') {
          if (user.role !== filters.role) {
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

  async getUserById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while fetching user with ID ${id}:`, error);
      return null;
    }
  }

  async getProcessById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/process/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while fetching user with ID ${id}:`, error);
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(`${this.baseUrl}/users`, newUser);
      return response.data;
    } catch (error) {
      console.error('Error while creating user:', error);
      return null;
    }
  }

  async updateUserById(id, updatedUser) {
    try {
      const response = await axios.put(`${this.baseUrl}/users/${id}`, updatedUser);
      return response.data;
    } catch (error) {
      console.error(`Error while updating user with ID ${id}:`, error);
      return null;
    }
  }

  async deleteUserById(id) {
    try {
      const response = await axios.delete(`${this.baseUrl}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while deleting user with ID ${id}:`, error);
      return false;
    }
  }
}

const usersApi = new UsersApi('http://localhost:3001/user');

export default usersApi;
