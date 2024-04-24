import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostList.css'; 

/**
 * PostList Component
 * 
 * Renders a list of posts fetched from JSONPlaceholder  API endpoint.
 */
function PostList() {
  // State variables for managing posts, loading state, and errors
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from API when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, []);
  
  // Render the component
  return (
    <div className="post-list-container">
      <h2>Posts</h2>
      {/* Render loading message, error message, or post list based on state */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul className="post-list">
          {/* Map through posts array and render each post */}
          {posts.map(post => (
            <li key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostList;
