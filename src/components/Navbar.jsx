// src/components/Navbar.jsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => (
  <Navbar bg="light" expand="lg" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', borderBottom: '1px solid var(--accent)' }}>
    <Container>
      <Navbar.Brand as={Link} to="/" style={{ color: 'var(--brand)' }}>Picstr</Navbar.Brand>
      <Nav className="ms-auto">
        <Nav.Link as={Link} to="/gallery" style={{ color: 'var(--text)' }}>Gallery</Nav.Link>
        <Nav.Link as={Link} to="/admin" style={{ color: 'var(--text)' }}>Admin</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default AppNavbar;
