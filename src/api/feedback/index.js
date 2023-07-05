import axios from 'axios';
import { deepCopy } from 'src/utils/deep-copy';

class FeedbacksApi {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getFeedbacks(request = {}) {
    
    let data = null;
    try {
      const response = await axios.get(`${this.baseUrl}/feedbacks`);

      data =  response.data;
    } catch (error) {
      console.error('Error while fetching feedbacks:', error);
      return [];
    }
    data = deepCopy(data);

    const feedbacks = data.map(feedback => {
      const comments = data.filter(item => item.parentFeedbackId === feedback.id);
      return {
        ...feedback,
        comments
      };
    });
    

    return feedbacks;
  }

  async getFeedbackById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/feedbacks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while fetching feedback with ID ${id}:`, error);
      return null;
    }
  }

  async createFeedback(newFeedback) {
    try {
      const response = await axios.post(`${this.baseUrl}/feedbacks`, newFeedback);
      return response.data;
    } catch (error) {
      console.error('Error while creating feedback:', error);
      return null;
    }
  }

  async updateFeedbackById(id, updatedFeedback) {
    try {
      const response = await axios.put(`${this.baseUrl}/feedbacks/${id}`, updatedFeedback);
      return response.data;
    } catch (error) {
      console.error(`Error while updating feedback with ID ${id}:`, error);
      return null;
    }
  }

  async deleteFeedbackById(id) {
    try {
      const response = await axios.delete(`${this.baseUrl}/feedbacks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while deleting feedback with ID ${id}:`, error);
      return false;
    }
  }
}

const feedbacksApi = new FeedbacksApi('http://localhost:3001');

export default feedbacksApi;
