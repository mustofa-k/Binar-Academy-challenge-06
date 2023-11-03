import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectMovieDetails,
  selectMoviesStatus,
  selectMoviesError,
} from '../redux/MovieList/movieSlice';
import { AiOutlineStar, AiOutlinePlayCircle } from 'react-icons/ai';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchMovieDetails } from '../redux/MovieList/movieActions';

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector(selectMovieDetails);
  const status = useSelector(selectMoviesStatus);
  const error = useSelector(selectMoviesError);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed' || !movie) {
    return <div>Error: {error}</div>;
  }

  const { data } = movie;

  return (
    <div className="dp-hero-section container-fluid" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${data.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar expand="lg" bg="transparent" className="navbar">
        <Link to="/" className="text-decoration-none text-danger fs-1 fw-bold cursor-pointer">
          Movielist
        </Link>
      </Navbar>
      <div className="d-flex align-items-center mt-5">
        <div className="dp-hero-content text-white w-50 ps-3 pe-1 pb-5">
          <h1 className="fs-1 fw-bold my-4 overflow-hidden">{data.title}</h1>
          <div className="movie-genre d-inline-block mt-2 mb-4 p-2">
            <span className="me-3">Genres:</span>
            {data.genres.map((genre) => (
              <div className="d-inline-flex border py-2 px-3" key={genre.id}>
                {genre.name}
              </div>
            ))}
          </div>
          <p className="mt-0 mb-4">{data.overview}</p>
          <div className="d-flex align-items-center mt-3 mb-5 gap-2">
            <AiOutlineStar className="rate-star" />
            {data.vote_average} / 10
          </div>
          <button className="btn-trailer py-2 border-0 rounded-5">
            <a href={`https://api.themoviedb.org/3/movie/${id}/videos?api_key=YOUR_API_KEY&language=en-US`} className="text-decoration-none fw-bold m-auto d-flex justify-content-center gap-1 align-items-center text-white">
              <AiOutlinePlayCircle className="fs-5 text-warning" /> WATCH TRAILER
            </a>
          </button>
        </div>
        <img className="movie-poster h-50 d-flex ms-auto me-5 mt-1 border border-2 border-dark rounded" src={`https://image.tmdb.org/t/p/w342${data.poster_path}`} alt={data.title} />
      </div>
    </div>
  );
}

export default Detail;
