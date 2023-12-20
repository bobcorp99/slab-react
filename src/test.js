import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState(null); // Store fetched data

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/data');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Render the appropriate icon based on the value
  const renderIcon = () => {
    if (!data) {
      return null; // Handle loading state
    }

    if (data.value === 'A') {
      return <i className="fas fa-check-circle"></i>; // Render check circle icon
    } else if (data.value === 'B') {
      return <i className="fas fa-times-circle"></i>; // Render times circle icon
    } else {
      return <i className="fas fa-exclamation-circle"></i>; // Render exclamation circle icon
    }
  };

  return (
    <div>
      <h1>Data Display</h1>
      {renderIcon()}
      <p>{data ? data.value : 'Loading...'}</p>
    </div>
  );
};

export default MyComponent;