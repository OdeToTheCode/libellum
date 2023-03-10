import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import cart from "../assets/images/cart.png";
import "../assets/css/nav.css"
import BookSearch from "./BookSearch";


function Navigation(props) {
    return (
      <div>
      <Navbar bg="light" expand="lg">
        <Container fluid className="navBarContainer">
          <Navbar.Brand href="#home"><h1>Libellum</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home"><h4>Explore</h4></Nav.Link>
              <Nav.Link href="#link"><h4>Login</h4></Nav.Link>
              <Nav.Link href="#link"><img className="cart" src={cart}></img></Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <BookSearch />
        </Container>
      </Navbar>
      </div>
    );
  }

export default Navigation;



