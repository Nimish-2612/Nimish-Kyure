import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles/FilterPanel.css'

const FilterPanel = ({ onFilterChange, currentFilters }) => {
  const [filters, setFilters] = useState({
    location: [],
    stipendRange: [],
    jobType: [],
    ...currentFilters
  });

  const locations = ['Remote', 'Hybrid', 'On-site'];
  const stipendRanges = ['0-5000', '5000-10000', '10000-20000', '20000+'];
  const jobTypes = ['Internship', 'Full-time'];

  const handleFilterToggle = (filterType, value) => {
    const newFilters = { ...filters };
    if (!Array.isArray(newFilters[filterType])) {
      newFilters[filterType] = [];
    }
    if (newFilters[filterType].includes(value)) {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    } else {
      newFilters[filterType] = [...newFilters[filterType], value];
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = { location: [], stipendRange: [], jobType: [] };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  const isFilterActive = (filterType, value) => {
    return Array.isArray(filters[filterType]) && filters[filterType].includes(value);
  };

  const countActiveFilters = () => {
    return filters.location.length + filters.stipendRange.length + filters.jobType.length;
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2>Filters</h2>
        {countActiveFilters() > 0 && (
          <button className="clear-filters-btn" onClick={clearAllFilters}>
            Clear All
          </button>
        )}
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Location</h3>
        <div className="filter-options">
          {locations.map(location => (
            <button
              key={location}
              className={`filter-btn ${isFilterActive('location', location) ? 'active' : ''}`}
              onClick={() => handleFilterToggle('location', location)}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Stipend Range</h3>
        <div className="filter-options">
          {stipendRanges.map(range => (
            <button
              key={range}
              className={`filter-btn ${isFilterActive('stipendRange', range) ? 'active' : ''}`}
              onClick={() => handleFilterToggle('stipendRange', range)}
            >
              ₹{range}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Job Type</h3>
        <div className="filter-options">
          {jobTypes.map(type => (
            <button
              key={type}
              className={`filter-btn ${isFilterActive('jobType', type) ? 'active' : ''}`}
              onClick={() => handleFilterToggle('jobType', type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  currentFilters: PropTypes.object
};

FilterPanel.defaultProps = {
  currentFilters: { location: [], stipendRange: [], jobType: [] }
};

export default FilterPanel;
