import axios from 'axios';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';
class RoomsApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getRooms() {
   
    try {
      const response = await axios.get(`${this.baseUrl}/rooms`);
      return response.data;
    } catch (error) {
      console.error('Error while fetching rooms:', error);
      return null;
    }
  }

  async getRoomById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/rooms/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while fetching room with ID ${id}:`, error);
      return null;
    }
  }

  async createRoom(newRoom) {
    try {
      const response = await axios.post(`${this.baseUrl}/rooms`, newRoom);
      return response.data;
    } catch (error) {
      console.error('Error while creating room:', error);
      return null;
    }
  }

  async updateRoomById(id, updatedRoom) {
    try {
      const response = await axios.put(`${this.baseUrl}/rooms/${id}`, updatedRoom);
      return response.data;
    } catch (error) {
      console.error(`Error while updating room with ID ${id}:`, error);
      return null;
    }
  }

  async addEquipToRoomById(id, equipment) {
    try {
      let updatedRoom = await this.getRoomById(id);
      console.log(updatedRoom);
      updatedRoom.equipment.push(equipment);
      const response = await axios.put(`${this.baseUrl}/rooms/${id}`, updatedRoom);
      return response.data;
    } catch (error) {
      console.error(`Error while updating room with ID ${id}:`, error);
      return null;
    }
  }

  async deleteRoomById(id) {
    try {
      const response = await axios.delete(`${this.baseUrl}/rooms/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while deleting room with ID ${id}:`, error);
      return false;
    }
  }
}

const roomsApi = new RoomsApi('http://localhost:3001');

export default roomsApi;
