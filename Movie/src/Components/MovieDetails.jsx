import React from 'react';
import { Link } from 'react-router-dom';

const MovieDetails = ({ movieList, onEditMovie, onDeleteMovie, setIsUpdated }) => {
  const handleDelete = (movie)=>{
    console.log("checking")
    onDeleteMovie(movie._id)
    setIsUpdated(true)

  }
  return (
    <div className="container mt-3">
    <div className="row">
      {movieList.length === 0 ? (
        <div className="col-12">
          <p>No movies listed yet.</p>
        </div>
      ) : (
        movieList.map((movie) => (
          <div className="col-md-4" key={movie._id}>
            <div className="card" style={{ width: "100%", marginBottom: '20px' }}>
              <div className="card-body">
                <h3>{movie.movieName}</h3>
                <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Budget:</strong> {movie.budget}Cr</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
                <p>Posted on: {new Date(movie.createdAt).toLocaleString()}</p>
  
                <Link to={`/update/${movie._id}`} className="btn btn-primary btn-sm">Edit</Link>
                <button 
                  className="btn btn-danger btn-sm" 
                  style={{ marginLeft: '10px' }} 
                  onClick={() => handleDelete(movie)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
  );
};

export default MovieDetails;
