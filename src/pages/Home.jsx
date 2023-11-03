import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Col, Container, InputGroup, Nav, Navbar, Row, FormControl, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import CarouselHome from '../components/Carousel';
import { selectPopularMovies, selectMoviesStatus, selectSearchResults } from '../redux/MovieList/movieSlice';
import { fetchPopularMovies, searchMovies } from '../redux/MovieList/movieActions';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const popularMovies = useSelector(selectPopularMovies);
  const status = useSelector(selectMoviesStatus);
  const searchResults = useSelector(selectSearchResults);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchPopularMovies());
    }
  }, [dispatch, isLoggedIn]);

  const handleCardClick = (movieId) => {
    navigate(`/detail/${movieId}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);

    
    if (e.target.value) {
      dispatch(searchMovies({ query: e.target.value, page: 1 }));
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" className="navbar" fixed="top">
        <Container>
          <Navbar.Brand className="text-danger fw-bold" as={Link} to="/">
            Movielist
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <InputGroup className="mb-3 mx-auto" style={{ maxWidth: '300px' }}>
              <FormControl
                placeholder="Cari..."
                className="border border-danger"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </InputGroup>
            <Nav>
              {isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to={'/users/dashboard'}>
                    <Button variant="outline-danger">Dashboard</Button>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      localStorage.removeItem('token');
                      navigate('/');
                    }}
                  >
                    <Button variant="danger">Logout</Button>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to={'/login'}>
                    <Button variant="outline-danger">Login</Button>
                  </Nav.Link>
                  <Nav.Link as={Link} to={'/register'}>
                    <Button variant="danger">Register</Button>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CarouselHome />
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <h1>Popular Movie</h1>
          </Col>
          <Col md={6} className="d-flex justify-content-end text-danger">
            See all Movies
          </Col>
        </Row>
        
      </Container>

      {isLoggedIn ? (
        status === 'loading' ? (
          <h2>Loading...</h2>
        ) : status === 'succeeded' ? (
          <Container className="list">
            <Row>
              {(searchQuery ? searchResults : popularMovies).map((movie, index) => (
                <Col
                  key={index}
                  md="3"
                  onClick={() => handleCardClick(movie.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card style={{ width: '18rem', backgroundColor: 'wheat', margin: '10px' }}>
                    <Card.Title className="text-center mt-4 md-4" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: '1.2' }}>
                      {movie.title}
                    </Card.Title>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                    <Card.Body>
                      <Card.Text>
                        <h4>Release: {movie.release_date}</h4>
                      </Card.Text>
                      <Card.Text className="text-danger fw-bold">
                        {movie.vote_average} / 10
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <footer  className='text-center'>
              <h3 className='text-white mt-3 '>By Mustofa kamal</h3>
            </footer>
          </Container>
        ) : null
      ) : (
        <Container className="list text-center">
          <h2 className='mb-5'>Login untuk melihat List Movie</h2>
          
        </Container>
        
      )}
    </>
  );
}

export default Home;
