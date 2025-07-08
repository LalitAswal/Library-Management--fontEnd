import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const NavBar = ({ user, handleLogout, handleProfile, handleBookList }) => {
  if (!user) return null;

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/Books_List">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown
              title={
                <>
                {console.log(`user`, user)}
                  <FaUserCircle className="me-2" />
                  {user.userName}
                </>
              }
              id="nav-dropdown"
              align="end"
            >
              <NavDropdown.ItemText>{user.role}</NavDropdown.ItemText>
              <NavDropdown.Divider />
              <NavDropdown.ItemText onClick={handleProfile}>profile</NavDropdown.ItemText>
              <NavDropdown.Divider />
              <NavDropdown.ItemText onClick={handleBookList}>Book List</NavDropdown.ItemText>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
