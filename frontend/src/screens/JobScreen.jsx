import { useState } from 'react';
import { useGetJobsQuery } from '../slices/jobsApiSlice';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../components/styles/JobScreen.css';
import Loader from '../components/Loader';
import ErrorScreen from './ErrorScreen';
import FilterPanel from '../components/FilterPanel';


const JobCategories = ({ selectedCategories, toggleCategory }) => {
  const categories = [
    'Software', 'AI/ML', 'Data Science', 'Cloud',
    'DevOps', 'Security', 'Frontend', 'Backend'
  ];

  return (
    <div className="categories-grid">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`category-item ${selectedCategories.includes(category) ? 'selected' : ''}`}
          onClick={() => toggleCategory(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

const JobScreen = () => {
  const { data, error, isLoading } = useGetJobsQuery();
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [advancedFilters, setAdvancedFilters] = useState({
    location: [],
    stipendRange: [],
    jobType: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const jobsPerPage = 18;
  const navigate = useNavigate();

  if (isLoading) return <Loader text="Loading jobs..." />;
  if (error) return <ErrorScreen message="Failed to load jobs. Please try again." retry={() => window.location.reload()} />;

  const jobs = data?.jobs || [];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleFilterChange = (newFilters) => {
    setAdvancedFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const filteredJobs = jobs.filter((job) => {
    // Category filter
    const categoryMatch = selectedCategories.length === 0 || 
      selectedCategories.includes(job.category);
    
    // Text search filter
    const textMatch = job.title.toLowerCase().includes(filter.toLowerCase()) || 
      job.company?.name.toLowerCase().includes(filter.toLowerCase());
    
    // Location filter
    const locationMatch = advancedFilters.location.length === 0 || 
      advancedFilters.location.some(loc => job.location?.includes(loc));
    
    // Job type filter
    const jobTypeMatch = advancedFilters.jobType.length === 0 || 
      advancedFilters.jobType.some(type => {
        if (type === 'Internship') {
          return job.duration && job.duration.toLowerCase().includes('month');
        } else if (type === 'Full-time') {
          return job.duration && job.duration.toLowerCase().includes('year');
        }
        return false;
      });
    
    // Stipend range filter
    let stipendMatch = advancedFilters.stipendRange.length === 0;
    
    if (!stipendMatch && job.stipend) {
      for (const range of advancedFilters.stipendRange) {
        if (range === '20000+') {
          if (job.stipend >= 20000) {
            stipendMatch = true;
            break;
          }
        } else {
          const [min, max] = range.split('-').map(Number);
          if (job.stipend >= min && job.stipend <= max) {
            stipendMatch = true;
            break;
          }
        }
      }
    }
    
    return categoryMatch && textMatch && locationMatch && jobTypeMatch && stipendMatch;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOrder === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return 0; // No sorting for 'all'
    }
  });

  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = sortedJobs.slice(startIndex, startIndex + jobsPerPage);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const getApplicantCount = (job) => {
    return job.application ? job.application.length : 0;
  };

  const anyFiltersApplied = () => {
    return advancedFilters.location.length > 0 || 
           advancedFilters.stipendRange.length > 0 || 
           advancedFilters.jobType.length > 0;
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="job-page-container relative" style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#f8f9fa' }}>
      <div className="categories-section">
        <h2 className="job-categories-title mb-5">Categories</h2>
        <JobCategories selectedCategories={selectedCategories} toggleCategory={toggleCategory} />
      </div>

      <div className="main-content">
        <div className="search-container">
          <input
            type="text"
            className="form-control search-bar"
            placeholder="Search for jobs..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <div className="filter-controls">
            <select
              className="form-select sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="all">All</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
            <br></br>
            <button 
              onClick={toggleFilters}
              className="filter-button ml-2 px-4 py-2 bg-blue-500 text-black rounded-md hover:bg-blue-600 transition-colors"
            >
              {showFilters ? 'Hide Filters' : 'Filters'} 
              {anyFiltersApplied() && (
                <span className="ml-1 px-2 py-1 bg-white text-blue-800 text-xs rounded-full">
                  {advancedFilters.location.length + advancedFilters.stipendRange.length + advancedFilters.jobType.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter panel - now positioned above the job cards */}
        {showFilters && (
          <div className="filter-panel-container mb-4">
            <FilterPanel
              onFilterChange={handleFilterChange}
              currentFilters={advancedFilters}
            />
          </div>
        )}

        <div className="jobs-grid">
          {currentJobs.length > 0 ? (
            currentJobs
              .filter((job) => job.active) // Ensure only active jobs are shown
              .map((job) => (
                <Card
                  type="job"
                  key={job._id}
                  className="job-card-custom"
                  title={job.title}
                  role={job.position || "Role Not Specified"}
                  location={job.location || "Location Not Specified"}
                  company={job.company?.name || "Company Not Specified"}
                  duration={job.duration || "Duration Not Specified"}
                  startDate={job.startsOn ? new Date(job.startsOn).toLocaleDateString() : "Start Date Not Specified"}
                  applicants={getApplicantCount(job)}
                  onClick={() => navigate(`/job-info/${job._id}`)}
                />
              ))
          ) : (
            <div className="no-jobs-message">No job records found.</div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination-container flex justify-center mt-4">
            <nav>
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button
                      onClick={() => handlePageChange(i + 1)}
                      className="page-link"
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

JobCategories.propTypes = {
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleCategory: PropTypes.func.isRequired,
};

export default JobScreen;