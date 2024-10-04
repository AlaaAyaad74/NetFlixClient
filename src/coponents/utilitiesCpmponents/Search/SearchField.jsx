import React, { useState } from 'react';
import './SearchField.scss';

const staticData = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
];

const SearchField = ({ onSearchResultClicked }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value) {
      const results = staticData.filter(item => item.toLowerCase().includes(value.toLowerCase()));
      setFilteredData(results);
    } else {
      setFilteredData([]);
    }
  };

  const handleClick = (item) => {
    onSearchResultClicked(item);
    setSearchText('');
    setFilteredData([]);
  };

  return (
    <div className="search-field">
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder="Search..."
      />
      {filteredData.length > 0 && (
        <div className="dropdown">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
      {searchText && filteredData.length === 0 && (
        <div className="dropdown">
          <div className="dropdown-item">No data found</div>
        </div>
      )}
    </div>
  );
};

export default SearchField;
