import { useState } from 'react';
import ModeratorApi from '../../../../api/moderator'; // API for making requests
import './addSeries.scss'; // Import SCSS for styles
import { json, useNavigate } from 'react-router-dom';

// Helper function for URL validation
const isValidUrl = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
};

const AddSeries = () => {
    const [seriesData, setSeriesData] = useState({
        title: '',
        desc: '',
        img: '',
        imgTitle: '',
        imgSm: '',
        trailer: '',
        language: [],
        avgRuntime: '',
        releaseYear: '',
        genre: [], // Assuming genre will be populated with IDs later
        seasons: [], // Keeping seasons list empty as requested
        createdBy: 1, // Placeholder, will be updated from local storage
        updatedBy: 1, // Placeholder, will be updated from local storage
    });

    const [loading, setLoading] = useState(false); // Loading state for form submission
    const [errors, setErrors] = useState({}); // Store validation errors
    const navigate = useNavigate(); // Navigation hook

    // Get user ID from local storage
    const storedDecodedToken = JSON.parse(localStorage.getItem("decodedToken"));
    const userId =storedDecodedToken.id; // Retrieve the token from local storage
 
    // Initialize createdBy and updatedBy with userId
    seriesData.createdBy = userId;
    seriesData.updatedBy = userId;

    // Handle form field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSeriesData({ ...seriesData, [name]: value });
    };

    // Client-side validation
    const validate = () => {
        let newErrors = {};

        if (!seriesData.title.trim()) newErrors.title = "Series title is required.";
        if (!seriesData.img.trim() || !isValidUrl(seriesData.img)) newErrors.img = "Valid image URL is required.";
        if (!seriesData.releaseYear || seriesData.releaseYear < 1900 || seriesData.releaseYear > new Date().getFullYear()) newErrors.releaseYear = "Enter a valid year.";
        if (seriesData.trailer && !isValidUrl(seriesData.trailer)) newErrors.trailer = "Enter a valid trailer URL.";
        if (seriesData.avgRuntime.trim() === '') newErrors.avgRuntime = "Average runtime is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true); // Start loading

        try {
            const payload = { ...seriesData }; // Prepare the payload
            const response = await ModeratorApi.addSeries(payload); // Submit the series data
            alert('Series added successfully!');
            // navigate(`/dashboard/upload-content/${response.data._id}`); // Navigate to content upload
        } catch (error) {
            console.error('Error adding series:', error);
            alert('Failed to add series. Check the console for details.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="add-series">
            <h1>Add New Series</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Series Title"
                    value={seriesData.title}
                    onChange={handleChange}
                    required
                />
                {errors.title && <span className="error">{errors.title}</span>}

                <textarea
                    name="desc"
                    placeholder="Description"
                    value={seriesData.desc}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="img"
                    placeholder="Poster Image URL"
                    value={seriesData.img}
                    onChange={handleChange}
                    required
                />
                {errors.img && <span className="error">{errors.img}</span>}

                <input
                    type="text"
                    name="imgTitle"
                    placeholder="Title Image URL"
                    value={seriesData.imgTitle}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="imgSm"
                    placeholder="Small Image URL"
                    value={seriesData.imgSm}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="trailer"
                    placeholder="Trailer URL"
                    value={seriesData.trailer}
                    onChange={handleChange}
                />
                {errors.trailer && <span className="error">{errors.trailer}</span>}

                <input
                    type="text"
                    name="avgRuntime"
                    placeholder="Average Runtime"
                    value={seriesData.avgRuntime}
                    onChange={handleChange}
                    required
                />
                {errors.avgRuntime && <span className="error">{errors.avgRuntime}</span>}

                <input
                    type="number"
                    name="releaseYear"
                    placeholder="Release Year"
                    value={seriesData.releaseYear}
                    onChange={handleChange}
                    required
                />
                {errors.releaseYear && <span className="error">{errors.releaseYear}</span>}

                <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Series'}</button>
            </form>
        </div>
    );
};

export default AddSeries;
