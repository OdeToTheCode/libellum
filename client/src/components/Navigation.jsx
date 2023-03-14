import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cart from "../assets/images/cart.png";
import BookSearch from "./BookSearch";


function Navigation({ bookData, setBookData }) {

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid style={{"background-color": "black"}}>
          <Navbar.Brand href="/"><h1 style={{"font-size": "70px", color: "#C1A99A"}}>Libellum</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/"><h4 style={{color: "white"}}>Home</h4></Nav.Link>
              <Nav.Link href="explore"><h4 style={{color: "white"}}>Explore</h4></Nav.Link>
              <Nav.Link href="login"><h4 style={{color: "white"}}>Login</h4></Nav.Link>
              <Nav.Link href="cart"><img src={cart} style={{width: "40px"}}></img></Nav.Link>
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

