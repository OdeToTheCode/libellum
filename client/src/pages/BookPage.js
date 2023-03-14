import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { mapToBook, displayAuthors } from "../components/Shared";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const BookPage = () => {
  const params = useParams();
  const [book, setBook] = useState([]);

  const fetchBook = async (bookID) => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${bookID}`
    );
    const data = response.data;
    console.log(data);
    setBook(mapToBook(data));
  };

  const addToCart = (book) => {
    console.log(`Navigating to cart with book ${book.isbn}`);
  };

  useEffect(() => {
    fetchBook(params.isbn);
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Image src={book.largeImg} alt={book.title} fluid />
        </Col>
        <Col md={8}>
          <h1>{book.title}</h1>
          <h2>{book.subtitle}</h2>
          <p>{book.price}</p>
          <Button variant="primary" onClick={() => addToCart(book)}>
            Add to Cart
          </Button>
          <hr />
          <h3>Written By:&nbsp;&nbsp;{displayAuthors(book)}</h3>
          <p>
            <span dangerouslySetInnerHTML={{ __html: book.description }}></span>
          </p>
          <p>{book.language}</p>
          <p>{book.maturity}</p>
          <p>{book.pageCount} pages</p>
          <p>{book.pubDate}</p>
          <p>{book.publisher}</p>
          <p>Categories: {book.categories}</p>
          <p>ISBN: {book.isbn}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default BookPage;