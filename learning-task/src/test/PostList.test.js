import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import PostList from '../components/PostList'; 
jest.mock('axios');

describe('PostList Component', () => {
  it('renders loading message while fetching data', async () => {
    axios.get.mockResolvedValueOnce({ data: [] }); // Mock API response with empty array
    const { getByText } = render(<PostList />);
    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByText('Posts')).toBeInTheDocument();
    });
  });

  it('renders error message if API call fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error')); // Mock API call failure
    const { getByText } = render(<PostList />);
    await waitFor(() => {
      expect(getByText('Error: API Error')).toBeInTheDocument();
    });
  });

  it('renders posts when API call succeeds', async () => {
    const mockData = [
      { id: 1, title: 'Post 1', body: 'Body of Post 1' },
      { id: 2, title: 'Post 2', body: 'Body of Post 2' },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData }); // Mock API response with sample data
    const { getByText } = render(<PostList />);
    await waitFor(() => {
      expect(getByText('Post 1')).toBeInTheDocument();
      expect(getByText('Body of Post 1')).toBeInTheDocument();
      expect(getByText('Post 2')).toBeInTheDocument();
      expect(getByText('Body of Post 2')).toBeInTheDocument();
    });
  });
});
