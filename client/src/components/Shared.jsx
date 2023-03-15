import defaultBookImg from "../assets/images/book.jpeg";

function randomIntFromInterval(min, max) { 
  return (Math.random() * (max - min + 1) + min).toFixed(2)
}

const displayAuthors = (book) => 
{
  if(!book || book.length<1)return <></>
  
  return book.authors.map(author => {
  return (
    <div key={author}>
      <div ><h3>{author}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3></div>
    </div>
  )
})}


const mapToBook = (item) => {
  
  const rndInt = randomIntFromInterval(10, 50)
  const authors = item.volumeInfo.authors ?? [];
  const imageSource = item.volumeInfo.imageLinks ?? {
    thumbnail: defaultBookImg,
    large: defaultBookImg
  };
  const isbnSource = item.volumeInfo.industryIdentifiers ??  [];
  const isbn13s = isbnSource.filter(isbn => isbn.type=="ISBN_13");
  const isbn = isbn13s.length > 0 ? isbn13s[0].identifier : "";
  // console.log(item)

  return {
    id: item.id,
    title: item.volumeInfo.title,
    subtitle: item.volumeInfo.subtitle,
    authors: authors,
    description: item.volumeInfo.description,
    image: imageSource.thumbnail,
    largeImg: imageSource.large ?? imageSource.thumbnail,
    price: `$${rndInt}`,
    language: item.volumeInfo.language,
    maturity: item.volumeInfo.maturityRating,
    pageCount: item.volumeInfo.pageCount,
    pubDate: item.volumeInfo.publishedDate,
    publisher: item.volumeInfo.publisher,
    categories: item.volumeInfo.categories,
    isbn: isbn
  }
}

export { mapToBook, displayAuthors };