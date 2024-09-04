import axios from 'axios';
import { User } from '../DataTypes'

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;

};