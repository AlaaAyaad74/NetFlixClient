import React, { useState } from 'react';
import './moderatorScss.scss'; // Import SCSS for styles
import ModeratorApi from "../../../api/moderator";

const AddMovie = () => {
    const [movieData, setMovieData] = useState({
        name: '',
        overview: '',
        poster_path: '',
        poster_Title: '',
        imgSm: '',
        backdrop_path: '',
        first_air_date: '',
        trailer: '',
        language: '',
        releaseYear: '',
        rating: 0,
        genre: '',
    });

    // Handle form field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData({
            ...movieData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Ensure the required fields are populated before making the request
        if (!movieData.name || !movieData.overview || !movieData.poster_path || 
            !movieData.poster_Title || !movieData.imgSm || !movieData.backdrop_path || 
            !movieData.first_air_date || !movieData.trailer || !movieData.language || 
            !movieData.releaseYear || !movieData.genre) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            // Split language by commas into an array
            const languageArray = movieData.language.split(',').map(lang => lang.trim());

            // Split genre into an array (assuming genre will be passed as an array of strings or ids)
            const genreArray = movieData.genre.split(',').map(gen => gen.trim());

            const payload = {
                ...movieData,
                language: languageArray,
                genre: genreArray,
            };

            const response = await ModeratorApi.addMovie(payload);
            console.log(response.data);
            alert('Movie added successfully!');

            // Reset the form
            setMovieData({
                name: '',
                overview: '',
                poster_path: '',
                poster_Title: '',
                imgSm: '',
                backdrop_path: '',
                first_air_date: '',
                trailer: '',
                language: '',
                releaseYear: '',
                rating: 0,
                genre: '',
            });
        } catch (error) {
            console.error(error);
            alert('Failed to add movie. Please check the console for more details.');
        }
    };

    return (
        <div className="add-movie">
            <h1>Add New Movie</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Movie Title" value={movieData.name} onChange={handleChange} required />
                <textarea name="overview" placeholder="Overview" value={movieData.overview} onChange={handleChange} required />
                <input type="text" name="poster_path" placeholder="Poster Image URL" value={movieData.poster_path} onChange={handleChange} required />
                <input type="text" name="poster_Title" placeholder="Poster Title Image URL" value={movieData.poster_Title} onChange={handleChange} required />
                <input type="text" name="imgSm" placeholder="Small Image URL" value={movieData.imgSm} onChange={handleChange} required />
                <input type="text" name="backdrop_path" placeholder="Backdrop Image URL" value={movieData.backdrop_path} onChange={handleChange} required />
                <input type="date" name="first_air_date" placeholder="Release Date" value={movieData.first_air_date} onChange={handleChange} required />
                <input type="text" name="trailer" placeholder="Trailer URL" value={movieData.trailer} onChange={handleChange} required />
                <input type="text" name="language" placeholder="Languages (comma separated)" value={movieData.language} onChange={handleChange} required />
                <input type="text" name="releaseYear" placeholder="Release Year" value={movieData.releaseYear} onChange={handleChange} required />
                <input type="number" name="rating" placeholder="Rating" value={movieData.rating} onChange={handleChange} min="0" max="10" />
                <input type="text" name="genre" placeholder="Genres (comma separated)" value={movieData.genre} onChange={handleChange} required />
                <button type="submit" className="submit-button">Add Movie</button>
            </form>
        </div>
    );
};

export default AddMovie;
