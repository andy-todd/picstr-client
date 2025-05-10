// src/components/Navbar.jsx
import React from 'react';
import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { BsSun, BsMoon } from 'react-icons/bs';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <BsNavbar bg={theme === 'light' ? 'light' : 'dark'} variant={theme === 'light' ? 'light' : 'dark'} expand="lg" className="mb-3">
      <Container>
        <BsNavbar.Brand as={Link} to="/">picstr</BsNavbar.Brand>
      </Container>
      <Container>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
            {user?.isAdmin && (
              <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
            )}
          </Nav>
          <Nav>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleTheme}
              className="theme-toggle me-3"
            >
              {theme === 'light' ? <BsMoon /> : <BsSun />}
            </Button>

            {user ? (
              <>
                <span className="nav-text me-3">{user.displayName || user.email}</span>
                <Button variant="outline-secondary" size="sm" onClick={logoutUser}>Logout</Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
