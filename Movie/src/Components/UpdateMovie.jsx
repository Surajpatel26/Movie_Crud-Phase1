import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateMovie = () => {
  const [movie, setMovie] = useState({
    movieName: '',
    actors: [],
    director: '',
    budget: '',
    genre: '',
  });
  const navigate = useNavigate();
  const { movieId } = useParams(); // Get movie ID from URL parameters

  // Fetch the movie details when the component mounts
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/movies/${movieId}`);
        setMovie(response.data); // Set the movie state with fetched data
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // Handle the form submission to update the movie
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8082/movies/${movieId}`, movie);
      navigate('/'); // Redirect to home page on success
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'actors') {
      setMovie((prev) => ({ ...prev, actors: value.split(',') })); // Convert actors input to an array
    } else {
      setMovie((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Update Movie</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Movie Name:</label>
          <input
            type="text"
            name="movieName"
            className="form-control"
            value={movie.movieName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Actors (comma separated):</label>
          <input
            type="text"
            name="actors"
            className="form-control"
            value={movie.actors.join(', ')}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Director:</label>
          <input
            type="text"
            name="director"
            className="form-control"
            value={movie.director}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Budget:</label>
          <input
            type="number"
            name="budget"
            className="form-control"
            value={movie.budget}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Genre:</label>
          <input
            type="text"
            name="genre"
            className="form-control"
            value={movie.genre}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
