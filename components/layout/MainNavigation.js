import classes from "./MainNavigation.module.css";
import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { GoLocation } from "react-icons/go";
import { Button } from "react-bootstrap";

function MainNavigation() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container className={classes.navbar_container}>
          <Link href="/" className={classes.title}>
            Housy
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link href="/" className={`me-4 ${classes.link}`}>
                All Properties
              </Link>
              <Link href="/new-house" className={classes.link}>
                Add New Property
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar className={`d-flex justify-content-center ${classes.location_navbar}`}>
        <Link href="/locations" className={classes.link}>
          <Button className={classes.location}>
            {" "}
            Explore locations <GoLocation />
          </Button>
        </Link>
      </Navbar>
    </>
  );
}

export default MainNavigation;
