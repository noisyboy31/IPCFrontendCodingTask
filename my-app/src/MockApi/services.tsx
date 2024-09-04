import axios from 'axios';
import { User } from '../DataTypes'

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch users ${error}`);
  }
};