import { useGetJobsQuery } from '../slices/jobsApiSlice';
import { useGetCoursesQuery } from '../slices/courseApiSlice';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card as BootstrapCard } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import Card from '../components/Card';
import Loader from "../components/Loader";
import ErrorScreen from "../screens/ErrorScreen";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { data: jobData, error: jobError, isLoading: jobLoading } = useGetJobsQuery();
  const { data: courseData, isLoading: courseLoading, error: courseError } = useGetCoursesQuery();

  const jobs = jobData?.jobs || [];
  const allCourses = courseData?.courses || [];
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technology', 'Business', 'Design', 'Marketing', 'More'];

  const filterCourses = (category) => {
    setActiveCategory(category);
    setFilteredCourses(
      category === 'All'
        ? allCourses
        : allCourses.filter(course => course.category === category.toLowerCase())
    );
  };

  if (jobLoading || courseLoading) return <Loader text="Loading content..." />;
  if (jobError) return <ErrorScreen message="Failed to load jobs." retry={() => window.location.reload()} />;
  if (courseError) return <ErrorScreen message="Failed to load courses." retry={() => window.location.reload()} />;

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#f8f9fa' }}>
      <section>
        <div className='bg-primary text-white text-center py-5'>
          <h1 className='fw-bold display-4'>Explore Internships & Courses</h1>
        </div>
      </section>

      {/* Courses Section */}
      <Container className='my-5'>
        <h2 className='text-center text-dark fw-bold mb-4' style={{ fontSize: '2rem' }}>Trending Courses</h2>
        <div className='d-flex justify-content-center gap-3 mb-4 flex-wrap'>
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'dark' : 'outline-secondary'}
              onClick={() => filterCourses(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <Row className='d-flex flex-wrap justify-content-center'>
          {filteredCourses.map((course) => (
            <Col key={course._id} xs={12} sm={6} md={4} lg={3} className='p-3'>
              <BootstrapCard
                className='shadow-sm border-0 p-3 text-center h-100'
                style={{ transition: 'transform 0.3s ease-in-out', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onClick={() => navigate(`/courses/${course._id}`)}
              >
                <BootstrapCard.Body>
                  <h5 className='fw-semibold text-primary'>{course.courseTitle}</h5>
                  <p className='text-muted small'>{course.description}</p>
                  <div className='d-flex justify-content-center gap-2 flex-wrap'>
                    <span className='badge bg-light text-dark'>Popular</span>
                    <span className='badge bg-light text-dark'>Best Seller</span>
                  </div>
                </BootstrapCard.Body>
              </BootstrapCard>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Jobs Section */}
      <Container className='my-5'>
        <h2 className='text-center text-dark fw-bold mb-4' style={{ fontSize: '2rem' }}>Featured Jobs</h2>
        <Row className='d-flex flex-wrap justify-content-center'>
          {jobs.slice(0, 8).map((job) => (
            <Col key={job._id} xs={12} sm={6} md={4} lg={3} className='p-3'>
              <BootstrapCard
                className='shadow-sm border-0 p-3 text-center h-100'
                style={{ transition: 'transform 0.3s ease-in-out', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onClick={() => navigate(`/job-info/${job._id}`)}
              >
                <BootstrapCard.Body>
                  <h5 className='fw-semibold text-primary'>{job.title}</h5>
                  <p className='text-muted small'>{job.company?.name || 'Company Not Specified'}</p>
                  <div className='d-flex justify-content-center gap-2 flex-wrap'>
                    <span className='badge bg-light text-dark'>{job.location || 'Location Not Specified'}</span>
                    <span className='badge bg-light text-dark'>{job.duration || 'Duration Not Specified'}</span>
                  </div>
                </BootstrapCard.Body>
              </BootstrapCard>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer className='text-center py-3' style={{ background: '#343a40', color: '#ffffff', fontFamily: 'Lora, serif', fontSize: '1.2rem' }}>
        @skilledity 2025
      </footer>
    </div>
  );
};

export default HomeScreen;
