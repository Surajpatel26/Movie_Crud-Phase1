import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import MovieForm from './Components/MovieForm';
import Footer from './Components/Footer';
import MovieDetails from './Components/MovieDetails';
import "bootstrap/dist/css/bootstrap.min.css";

import axios from 'axios';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isUpdated, setIsUpdated] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [editMovie, setEditMovie] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Fantasy'];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsUpdated(false);
        const response = await axios('http://localhost:8082/movies');
        setMovieList(response.data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, [isUpdated]);

  const filterMoviesByGenre = (movies, selectedGenre) => {
    if (!selectedGenre) return movies; // Return all movies if no genre is selected
    return movies.filter(movie => movie.genre === selectedGenre);
  };

  const filteredMovies = filterMoviesByGenre(movieList, selectedGenre);

  const createMovie = async (movie) => {
    try {
      console.log(movie);
      const response = await axios.post('http://localhost:8082/movies', movie, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  };

  const handleCreateMovieClick = () => {
    setEditMovie(null);
    setCurrentView('createMovie');
  };

  const handleHomeClick = () => {
    setCurrentView('home');
  };

  const handleAddOrUpdateMovie = async (movie) => {
    try {
      if (editMovie) {
        const updatedMovie = await updateMovie(editMovie._id, movie);
        const updatedMovies = movieList.map((m) =>
          m._id === updatedMovie._id ? updatedMovie : m
        );
        setMovieList(updatedMovies);
      } else {
        const createdMovie = await createMovie(movie);
        setMovieList([...movieList, createdMovie]);
      }
      setCurrentView('home');
    } catch (error) {
      console.error('Error handling movie:', error);
    }
  };

  const updateMovie = async (movieId, updatedMovie) => {
    try {
      const response = await axios.put(`http://localhost:8082/movies/${movieId}`, updatedMovie);
      return response.data;
    } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
    }
  };

  const handleEditMovie = (movieId) => {
    const movieToEdit = movieList.find((movie) => movie._id === movieId);
    setEditMovie(movieToEdit);
    setCurrentView('createMovie');
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const response = await axios.delete(`http://localhost:8082/movies/${movieId}`);
      
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw error;
    }
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar onCreateMovieClick={handleCreateMovieClick} onHomeClick={handleHomeClick} />

        <div style={{ marginLeft: '1rem' }}>
          <label htmlFor="genre-select">Filter by Genre:</label>
          <select id="genre-select" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional Rendering based on the current view */}
        {currentView === 'createMovie' ? 
          <MovieForm 
            onAddOrUpdateMovie={handleAddOrUpdateMovie} 
            editMovie={editMovie} 
          /> :
          <MovieDetails 
            movieList={filteredMovies} 
            onEditMovie={handleEditMovie} 
            onDeleteMovie={handleDeleteMovie} 
            setIsUpdated={(val) => setIsUpdated(val)}
          />}
      </div>
      <Footer />
    </div>
  );
};

export default App;
