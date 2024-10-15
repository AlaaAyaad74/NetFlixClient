import { useState } from 'react';
import './moderatorScss.scss'; // Import SCSS for styles
import ModeratorApi from "../../../api/moderator";

const AddMovie = ( ) => {
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
        genre: [],
    });
    const availableGenres = [
        { _id: '64d8e6a5c08f9a1234567890', name: 'Action' },
        { _id: '64d8e6a5c08f9a0987654321', name: 'Drama' },
      ];
      
    // Handle form field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData({
            ...movieData,
            [name]: value,
        });
    };

    // Handle genres as an array of ObjectIds
    const handleGenreChange = (e) => {
        const selectedGenres = Array.from(e.target.selectedOptions, option => option.value);
        setMovieData({
            ...movieData,
            genre: selectedGenres,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!movieData.name || !movieData.overview || !movieData.poster_path || 
            !movieData.poster_Title || !movieData.imgSm || !movieData.backdrop_path || 
            !movieData.first_air_date || !movieData.trailer || !movieData.language || 
            !movieData.releaseYear || movieData.genre.length === 0) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const languageArray = movieData.language.split(',').map(lang => lang.trim());

            const payload = {
                ...movieData,
                language: languageArray,
                rating: parseFloat(movieData.rating) || 0,
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
                genre: [],
            });

            // Navigate to the video upload page with contentId (from response)
            const contentId = response.data._id;
            window.location.href = `/upload-content/${contentId}`;

        } catch (error) {
            console.error(error.response.data);
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
                <input type="number" name="rating" placeholder="Rating (0 to 5)" value={movieData.rating} onChange={handleChange} min="0" max="5" />
                
                {/* Dropdown for genres */}
                <select multiple className="genre-dropdown" name="genre" value={movieData.genre} onChange={handleGenreChange} required>
                    {availableGenres.map((genre) => (
                        <option key={genre._id} value={genre._id}>
                            {genre.name}
                        </option>
                    ))}
                </select>

                <button type="submit" className="submit-button">Add Movie</button>
            </form>
        </div>
    );
};

export default AddMovie;
