import classes from "./MainNavigation.module.css";
import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { GoLocation } from "react-icons/go";

function MainNavigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container className={classes.navbar_container}>
        <Link href="/" className={classes.title}>
          Housy
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/locations" className={`me-4 ${classes.link}`}>
              Explore locations <GoLocation />
            </Link>
            <Link href="/" className={`me-4 ${classes.link}`}>
              All Properties
            </Link>
            <Link href="/new-house" className={classes.link}>Add New Property</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
