import * as React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; 
  padding: 0 20px; 
  box-sizing: border-box;
`;

export const SearchContainer = styled.div`
 display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 
  max-width: 400px;
  margin: 20px auto;
`;

export const SearchInput = styled.input`
  margin-bottom: 20px;
  padding: 12px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  padding-bottom: 50px;
`;

export const SortButton = styled.button`
  flex: 1;
  margin: 0 5px;
  padding: 8px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const UserGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10%;
  padding: 16px;
  text-align: center;
  width: 200px;
  font-family: math;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;