import classes from "./MainNavigation.module.css";
import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function MainNavigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container className={classes.navbar_container}>
          <Link href="/">Housy</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/" className="me-4">All Properties</Link>
            <Link href="/new-house">Add New Property</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
