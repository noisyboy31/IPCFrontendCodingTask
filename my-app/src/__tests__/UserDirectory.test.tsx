// src/components/UserDirectory.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { fetchUsers } from '../MockApi/services';
import { User } from '../DataTypes';
import UserDirectory from '../components/UserDirectory';

// Mock the API call
jest.mock('../MockApi/services', () => ({
  fetchUsers: jest.fn(),
}));

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
    profilePicture: 'https://via.placeholder.com/150?text=L',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    email: 'Shanna@melissa.tv',
    profilePicture: 'https://via.placeholder.com/150?text=E',
  },
];

describe('UserDirectory Component', () => {
  beforeEach(() => {
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
  });

  test('renders the UserDirectory component', async () => {
    render(<UserDirectory />);

    // Wait for the users to be loaded
    await waitFor(() => {
      expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    });
  });

  test('filters users based on search input', async () => {
    render(<UserDirectory />);

    // Wait for the users to be loaded
    await waitFor(() => {
      expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    });

    // Search for "Leanne"
    fireEvent.change(screen.getByPlaceholderText('Search by name or email'), {
      target: { value: 'Leanne' },
    });

    // Check if the filtered result only shows Leanne Graham
    expect(screen.queryByText('Ervin Howell')).not.toBeInTheDocument();
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
  });

  test('sorts users by name', async () => {
    render(<UserDirectory />);

    // Wait for the users to be loaded
    await waitFor(() => {
      expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    });

    // Sort by name
    fireEvent.click(screen.getByText('Sort by Name'));

    // Verify if sorting works as expected
    const userCards = screen.getAllByRole('heading');
    expect(userCards[0]).toHaveTextContent('Ervin Howell');
    expect(userCards[1]).toHaveTextContent('Leanne Graham');
  });

  test('sorts users by email', async () => {
    render(<UserDirectory />);

    // Wait for the users to be loaded
    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
    });

    // Sort by email
    fireEvent.click(screen.getByText('Sort by Email'));

    // Verify if sorting works as expected
    const userCards = screen.getAllByRole('heading');
    expect(userCards[0]).toHaveTextContent('Ervin Howell');
    expect(userCards[1]).toHaveTextContent('Leanne Graham');
  });
});
