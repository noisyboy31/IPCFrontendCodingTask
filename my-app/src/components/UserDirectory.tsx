import React, { useEffect, useState } from 'react';
import { User } from '../DataTypes'
import { fetchUsers } from '../MockApi/services';
import { 
  SearchInput, UserGrid, SortButton, UserCard, UserImage, Container, ButtonContainer, SearchContainer,
} from './UserDirectoryCSS';


const UserDirectory: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortKey, setSortKey] = useState<'name' | 'email'>('name');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null); 
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setError(`Failed to load users ${error}. Please try again later.`);
        setLoading(false); 
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value.toLowerCase());

  const handleSort = (key: 'name' | 'email') => {
    setSortKey(key);
    setUsers((prevUsers) =>
      [...prevUsers].sort((a, b) => a[key].localeCompare(b[key]))
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
  );

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchContainer>

      <ButtonContainer>
        <SortButton onClick={() => handleSort('name')}>Sort by Name</SortButton>
        <SortButton onClick={() => handleSort('email')}>Sort by Email</SortButton>
      </ButtonContainer>

      {error && <p style={{ color: 'red', alignItems: 'center' }}>{error}</p>}
      <UserGrid>
        {!loading ? (
          filteredUsers.map((user) => (
            <UserCard key={user.id}>
              <UserImage
                src={`https://via.placeholder.com/150?text=${user.name.charAt(0)}`}
                alt={user.name}
              />
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </UserCard>
          ))
        ): (
          <div>Loading...</div>
        )}
      </UserGrid>
    </Container>
  );
};

export default UserDirectory;
