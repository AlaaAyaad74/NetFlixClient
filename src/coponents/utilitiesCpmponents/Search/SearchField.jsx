import React, { useState, useEffect, useCallback } from 'react';
import './SearchField.scss';
import customApi from '../../../api/tmdbApi'; // Import your Axios client

const SearchField = ({ onSearchResultClicked }) => {
  const [searchText, setSearchText] = useState(''); // State to hold the value of the input
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimeout = React.useRef(null);

  // Function to fetch search results using globalSearch (Axios-based API call)
  const fetchSearchResults = useCallback(async (query) => {
    setLoading(true);
    setError(null); // Reset the error
    try {
      // Call globalSearch method from the API client
      const response = await customApi.globalSearch(query);
      console.log(response);

      // Combine movies, series, and tvShows results
      const results = [
        ...response.movies, 
        ...response.series, 
        ...response.tvShows // Include tvShows in the results
      ];
      setFilteredData(results);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle input change with debouncing
  const handleChange = (e) => {
    const value = e.target.value; // Get the current input value
    setSearchText(value); // Update the state with the input value

    // Clear previous debounce timeout
    clearTimeout(debounceTimeout.current);

    if (value) {
      debounceTimeout.current = setTimeout(() => {
        fetchSearchResults(value); // Trigger search API call after debounce delay
      }, 500); // Adjust the debounce delay if necessary
    } else {
      setFilteredData([]); // Clear the results if input is empty
    }
  };

  // Handle click event on search result
  const handleClick = (item) => {
    onSearchResultClicked(item);
    setSearchText(''); // Clear search text after selection
    setFilteredData([]); // Clear filtered data
  };

  return (
    <div className="search-field">
      {/* Input field for search */}
      <input
        type="text"
        value={searchText} // Controlled component: value is linked to the state
        onChange={handleChange} // Handle user input changes
        placeholder="Search..." // Placeholder text
        color='white'
      />

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {/* Display search results */}
      {filteredData.length > 0 && (
        <div className="dropdown">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleClick(item)}
            >
              {item.title || item.name} {/* Display title or name */}
            </div>
          ))}
        </div>
      )}

      {/* Handle no data scenario */}
      {searchText && !loading && filteredData.length === 0 && (
        <div className="dropdown">
          <div className="dropdown-item">No data found</div>
        </div>
      )}
    </div>
  );
};

export default SearchField;
