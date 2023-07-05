import axios from 'axios';
import { createResourceId } from 'src/utils/create-resource-id';
import { wait } from 'src/utils/wait';
import usersApi from '../users';

class AuthApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  async signIn(request) {
    const { email, password } = request;
    
    return new Promise(async (resolve, reject) => {
      try {
        
        let data = null;
        try {
          const response = await axios.get(`${this.baseUrl}`);
          data =  response.data;
        } catch (error) {
          console.error('Error while fetching users:', error);
          window.location.href = '/500';
          return null;
        }
        const user = data.find((user) => user.email === email);
        console.log(user)
        if (!user || (user.password !== password)) {
          reject(new Error('Please check your email and password'));
          return;
        }

        resolve(user);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
      
    });
  }

  async signUp(request) {
    const { email, name, password } = request;

    return new Promise(async (resolve, reject) => {
      try {
        let data = null;
        try {
          const response = await axios.get(`${this.baseUrl}`);
          data =  response.data;
        } catch (error) {
          console.error('Error while fetching users:', error);
          window.location.href = '/500';
          return null;
        }
        let user = data.find((user) => user.email === email);

        if (user) {
          reject(new Error('User already exists'));
          return;
        }

        user = {
          id: createResourceId(),
          avatar: undefined,
          email,
          name,
          password,
          role: "user",
          
        };

        try {
          const response = await axios.post(`${this.baseUrl}`, user);
          return response.data;
        } catch (error) {
          console.error('Error while creating user:', error);
          return null;
        }

        
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi('http://localhost:3001/user');
