import { useState } from 'react';
import PropTypes from 'prop-types';

const Card = ({ image, title, role, location, company, duration, startDate, applicants, difficulty, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        ...(isHovered ? hoverEffect.cardHover : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.headerContainer}>
        <img src={image} alt={`${title} image`} style={styles.largeImage} />
        <p style={styles.company}>{company}</p>
      </div>
      <h3 style={styles.title}>{title}</h3>
      {role && <p style={styles.role}>Role: {role}</p>}
      {duration && <p style={styles.duration}>Duration: {duration}</p>}
      {location && <p style={styles.location}>Location: {location}</p>}
      {startDate && <p style={styles.startDate}>Starts on: {startDate}</p>}
      {applicants !== undefined && (
        <p style={styles.applicants}>Applicants: {applicants}</p>
      )}
      <div style={styles.difficultyContainer}>
        <p style={styles.difficulty}>Difficulty: {difficulty}</p>
      </div>
      <p
        style={{
          ...styles.clickToApply,
          ...(isHovered ? hoverEffect.clickToApplyHover : {}),
        }}
      >
        Click to Apply
      </p>
    </div>
  );
};

const styles = {
  card: {
    width: '300px',
    height: 'auto',
    position: 'relative',
    borderRadius: '20px',
    background: '#FFFFFF',
    padding: '20px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  largeImage: {
    width: '100%',
    height: '80%',
    background: '#D9D9D9',
    borderRadius: '8px',
  },
  company: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    fontWeight: 600,
    color: '#000000',
    margin: 0,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: '22px',
    fontWeight: 800,
    lineHeight: '26px',
    color: '#4a90e2',
    margin: '0 0 16px 0',
  },
  role: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 400,
    color: '#000000',
    margin: '8px 0',
  },
  duration: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 400,
    color: '#000000',
    margin: '8px 0',
  },
  location: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 400,
    color: '#000000',
    margin: '8px 0',
  },
  startDate: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 400,
    color: '#000000',
    margin: '8px 0',
  },
  applicants: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 400,
    color: '#000000',
    margin: '8px 0',
  },
  difficultyContainer: {
    marginTop: '12px',
    padding: '10px',
    background: '#f4f4f4',
    borderRadius: '8px',
    textAlign: 'left',
  },
  difficulty: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 600,
    color: '#333',
    margin: 0,
  },
  clickToApply: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    fontWeight: 400,
    color: '#000000',
    marginTop: '12px',
    fontStyle: 'italic',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
};

const hoverEffect = {
  cardHover: {
    boxShadow: '0 0 20px rgba(74, 144, 226, 0.1), 0 0 20px rgba(74, 144, 226, 0.2)',
    transform: 'scale(1.05)',
  },
  clickToApplyHover: {
    opacity: 1,
  },
};

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  role: PropTypes.string,
  location: PropTypes.string,
  company: PropTypes.string,
  duration: PropTypes.string,
  startDate: PropTypes.string,
  applicants: PropTypes.number,
  difficulty: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Card;
