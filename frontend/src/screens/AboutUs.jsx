
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <Container style={{ marginTop: '40px', paddingBottom: '40px' }}>
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 style={{ color: '#007BFF', fontWeight: 'bold', marginBottom: '20px' }}>About SkillPact</h1>
          <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
            Welcome to <strong>SkillPact</strong>, the next-generation <strong>skill-based hiring platform</strong> designed for ambitious individuals and innovative startups.  
            SkillPact bridges the gap between talent and opportunity by offering a curated selection of <strong>courses</strong> and <strong>internship opportunities</strong> — tailored to prepare you for the fast-paced world of startups.
          </p>

          <h2 style={{ color: '#007BFF', marginTop: '30px' }}>Empowering Startups, Elevating Skills</h2>
          <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
            At SkillPact, we understand the dynamic nature of startups and the need for versatile, skilled individuals who can make an immediate impact.
            Whether youre a developer, marketer, designer, or entrepreneur — SkillPact offers specialized <strong>startup-focused courses</strong> designed to accelerate your growth and adaptability.
          </p>

          <h2 style={{ color: '#007BFF', marginTop: '30px' }}>Internships That Matter</h2>
          <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
            SkillPact connects you with cutting-edge startups that are reshaping industries. Our platform offers meaningful, project-based <strong>internship opportunities</strong> that go beyond traditional learning.
            Gain hands-on experience, build your network, and launch your career — all through SkillPact’s ever-growing startup ecosystem.
          </p>

          <h2 style={{ color: '#007BFF', marginTop: '30px' }}>Why Choose SkillPact?</h2>
          <ul style={{ fontSize: '18px', lineHeight: '1.8', textAlign: 'left', listStyleType: 'square' }}>
            <li><strong>Skill-based hiring:</strong> Forget resumes — SkillPact connects you with employers based on your actual skills.</li>
            <li><strong>Startup-centric:</strong> Built for startups, SkillPact helps fast-growing companies find adaptable, multi-talented candidates.</li>
            <li><strong>Real-world learning:</strong> SkillPact courses prepare you for practical, in-demand skills that startups are looking for.</li>
            <li><strong>Internship opportunities:</strong> Get direct access to internships that align with your career goals.</li>
            <li><strong>Community-driven:</strong> Join the SkillPact network and collaborate with like-minded learners, entrepreneurs, and innovators.</li>
          </ul>

          <p style={{ fontSize: '18px', lineHeight: '1.8', marginTop: '30px' }}>
            Ready to elevate your career and join the startup revolution? Start your journey with SkillPact — where skills meet opportunity.
          </p>

          <h3 style={{ color: '#007BFF', marginTop: '30px' }}>SkillPact — Skills. Startups. Success.</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
