import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import axios from 'axios';
import PostList from '../components/PostList';
jest.mock('axios');

/**
 * PostList Component Tests
 * 
 * Test cases for the PostList component.
 */
describe('PostList Component', () => {
  // Test case for rendering error message if API call fails
  it('renders error message if API call fails', async () => {
    // Mock API call failure
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    // Render PostList component and wait for API call
    const { getByText } = render(<PostList />);
    await waitFor(() => {
      // Expect error message to be rendered
      expect(getByText('Error: API Error')).toBeInTheDocument();
    });
  });

  // Test case for rendering posts when API call succeeds
  it('renders posts when API call succeeds', async () => {
    // Mock API response with sample data
    const mockData = [
      { id: 1, title: 'Post 1', body: 'Body of Post 1' },
      { id: 2, title: 'Post 2', body: 'Body of Post 2' },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });

    // Render PostList component and wait for API call
    const { getByText } = render(<PostList />);
    await waitFor(() => {
      // Expect each post to be rendered with its title and body
      expect(getByText('Post 1')).toBeInTheDocument();
      expect(getByText('Body of Post 1')).toBeInTheDocument();
      expect(getByText('Post 2')).toBeInTheDocument();
      expect(getByText('Body of Post 2')).toBeInTheDocument();
    });
  });
});
