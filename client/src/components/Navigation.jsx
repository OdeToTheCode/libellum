import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cart from "../assets/images/cart.png";
import "../assets/css/nav.css"
import BookSearch from "./BookSearch";


function Navigation({ bookData, setBookData }) {

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid className="navBarContainer">
          <Navbar.Brand href="/"><h1 style={{"font-size": "70px", color: "#C1A99A"}}>Libellum</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/"><h4>Home</h4></Nav.Link>
              <Nav.Link href="explore"><h4>Explore</h4></Nav.Link>
              <Nav.Link href="login"><h4>Login</h4></Nav.Link>
              <Nav.Link href="cart"><img className="cart" src={cart}></img></Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <BookSearch bookData={bookData} setBookData={setBookData} />
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;


// / f \ b

