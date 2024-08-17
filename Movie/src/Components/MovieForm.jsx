import React, { useState, useEffect } from 'react';

const MovieForm = ({ onAddOrUpdateMovie, editMovie }) => {
  const [movieName, setMovieName] = useState('');
  const [actors, setActors] = useState('');
  const [director, setDirector] = useState('');
  const [budget, setBudget] = useState('');
  const [genre, setGenre] = useState('');
  const [createdAt, setCreatedAt] = useState(''); // New state for createdAt

  useEffect(() => {
    if (editMovie) {
      setMovieName(editMovie.movieName);
      setActors(editMovie.actors.join(', '));
      setDirector(editMovie.director);
      setBudget(editMovie.budget);
      setGenre(editMovie.genre);
      setCreatedAt(editMovie.createdAt); // Set the createdAt date
    } else {
      // Clear form if not editing
      setMovieName('');
      setActors('');
      setDirector('');
      setBudget('');
      setGenre('');
      setCreatedAt(''); // Clear the createdAt date
    }
  }, [editMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const movie = {
      id: editMovie ? editMovie.id : Date.now(), // Use existing id if editing, else create new id
      movieName,
      actors: actors.split(',').map(actor => actor.trim()),
      director,
      budget,
      genre,
      createdAt: editMovie ? editMovie.createdAt : new Date(), // Preserve the original createdAt or set to now
    };
    
    onAddOrUpdateMovie(movie); // Add or update the movie

    // Optionally reset the form after submission
    setMovieName('');
    setActors('');
    setDirector('');
    setBudget('');
    setGenre('');
    setCreatedAt('');
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-4">{editMovie ? 'Edit Movie' : 'Add Movie'}</h2>
      <div className="mb-3">
        <label htmlFor="movieName" className="form-label">Movie Name</label>
        <input 
          type="text" 
          id="movieName" 
          className="form-control" 
          value={movieName} 
          onChange={(e) => setMovieName(e.target.value)} 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="actors" className="form-label">Actors (comma separated)</label>
        <input 
          type="text" 
          id="actors" 
          className="form-control" 
          value={actors} 
          onChange={(e) => setActors(e.target.value)} 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="director" className="form-label">Director</label>
        <input 
          type="text" 
          id="director" 
          className="form-control" 
          value={director} 
          onChange={(e) => setDirector(e.target.value)} 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="budget" className="form-label">Budget</label>
        <input 
          type="text" 
          id="budget" 
          className="form-control" 
          value={budget} 
          onChange={(e) => setBudget(e.target.value)} 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="genre" className="form-label">Genre</label>
        <input 
          type="text" 
          id="genre" 
          className="form-control" 
          value={genre} 
          onChange={(e) => setGenre(e.target.value)} 
        />
      </div>

      {/* Display the createdAt date if available */}
      {createdAt && (
        <div className="mb-3">
          <label className="form-label">Posted on</label>
          <p>{new Date(createdAt).toLocaleString()}</p>
        </div>
      )}

      <div>
        <button type="submit" className="btn btn-primary me-2">
          {editMovie ? 'Update Listing' : 'Add Listing'}
        </button>
        <button 
          type="reset" 
          className="btn btn-secondary" 
          onClick={() => {
            setMovieName('');
            setActors('');
            setDirector('');
            setBudget('');
            setGenre('');
            setCreatedAt(''); // Clear createdAt on reset
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
