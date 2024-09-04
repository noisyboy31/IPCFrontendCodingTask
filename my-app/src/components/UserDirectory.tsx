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
  console.log('user', users);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
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

      <UserGrid>
        {filteredUsers.map((user) => (
          <UserCard key={user.id}>
            <UserImage
              src={`https://via.placeholder.com/150?text=${user.name.charAt(0)}`}
              alt={user.name}
            />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </UserCard>
        ))}
      </UserGrid>
    </Container>
  );
};

export default UserDirectory;
