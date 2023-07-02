import { createResourceId } from 'src/utils/create-resource-id';
import { wait } from 'src/utils/wait';
import { users } from './data';

class AuthApi {
  async signIn(request) {
    const { email, password } = request;
    
    return new Promise((resolve, reject) => {
      try {
        // Find the user
        const user = users.find((user) => user.email === email);
        
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

    return new Promise((resolve, reject) => {
      try {
        // Check if a user already exists
        let user = users.find((user) => user.email === email);

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
          role: 5
        };

        users.push(user);

        
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
