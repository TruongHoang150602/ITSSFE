import axios from "axios";
import { applyPagination } from "src/utils/apply-pagination";
import { applySort } from "src/utils/apply-sort";
import { deepCopy } from "src/utils/deep-copy";

class CustomersApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getCustomers(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;
    let data = null;
    try {
      const response = await axios.get(`${this.baseUrl}/customers`);
      data = response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      window.location.href = "/500";
      return null;
    }
    data = deepCopy(data);
    data = data.filter((option) => option.role === "customer" || option.role === "member");
    let count = data.length;

    if (typeof filters !== "undefined") {
      data = data.filter((customer) => {
        if (typeof filters.query !== "undefined" && filters.query !== "") {
          let queryMatched = false;
          const properties = ["email", "first_name", "last_name"];

          properties.forEach((property) => {
            if (customer[property].toLowerCase().includes(filters.query.toLowerCase())) {
              queryMatched = true;
            }
          });

          if (!queryMatched) {
            return false;
          }
        }

        if (typeof filters.role !== "undefined") {
          if (customer.role !== filters.role) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof sortBy !== "undefined" && typeof sortDir !== "undefined") {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== "undefined" && typeof rowsPerPage !== "undefined") {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count,
    });
  }

  async getCustomerById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/user/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while fetching customer with ID ${id}:`, error);
      return null;
    }
  }

  async getProcessById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/process/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while fetching customer with ID ${id}:`, error);
      return null;
    }
  }

  async addProcessById(id, newActivity) {
    try {
      console.log(newActivity);
      let updateProcess = await this.getProcessById(id);
      updateProcess.process = [newActivity, ...updateProcess.process];
      const response = await axios.put(`${this.baseUrl}/process/${id}`, updateProcess);
      return response.data;
    } catch (error) {
      console.error(`Error while fetching customer with ID ${id}:`, error);
      return null;
    }
  }

  async createCustomer(newCustomer) {
    try {
      const response = await axios.post(`${this.baseUrl}/users`, newCustomer);
      return response.data;
    } catch (error) {
      console.error("Error while creating customer:", error);
      return null;
    }
  }

  async updateCustomerById(id, updatedCustomer) {
    try {
      const response = await axios.put(`${this.baseUrl}/users/${id}`, updatedCustomer);
      return response.data;
    } catch (error) {
      console.error(`Error while updating customer with ID ${id}:`, error);
      return null;
    }
  }

  async deleteCustomerById(id) {
    try {
      const response = await axios.delete(`${this.baseUrl}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while deleting customer with ID ${id}:`, error);
      return false;
    }
  }
}

const customersApi = new CustomersApi("http://localhost:8081/user");

export default customersApi;
