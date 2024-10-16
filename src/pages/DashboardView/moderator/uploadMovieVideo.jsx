import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './moderatorScss.scss'; // Import SCSS for styles
import ModeratorApi from "../../../api/moderator"; // Ensure API is configured for file uploads

const UploadContent = () => {
    const { movieId } = useParams(); // Get the movieId from URL
    const navigate = useNavigate(); // Hook for navigation
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [type, setType] = useState('free'); // Default type set to 'free'
    const [loading, setLoading] = useState(false); // Loading state

    // Handle file change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle content type change
    const handleTypeChange = (e) => {
        setType(e.target.value); // Update the content type based on user selection
    };

    // Handle form submission for video upload
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !title) {
            alert("Please provide a file and title.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('contentId', movieId); // Use the movieId as contentId
        formData.append('type', type); // Add the selected type to form data

        setLoading(true); // Start loading

        try {
            const response = await ModeratorApi.uploadContent(formData);
            alert('Content uploaded successfully!');
            console.log(response.data);
            navigate('/dashboard/moderator'); // Navigate to Moderator Dashboard
        } catch (error) {
            console.error(error);
            alert('Failed to upload content. Please check the console for more details.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="upload-content">
            <h1>Upload Video Content</h1>
            {loading && <p>Loading... Please wait.</p>} {/* Show loading message */}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="text"
                    name="title"
                    placeholder="Content Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    required
                />

                {/* Radio buttons for content type selection */}
                <div className="content-type-selection">
                    <label>
                        <input
                            type="radio"
                            value="free"
                            checked={type === 'free'}
                            onChange={handleTypeChange}
                        />
                        Free
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="prime"
                            checked={type === 'prime'}
                            onChange={handleTypeChange}
                        />
                        Prime
                    </label>
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
        </div>
    );
};

export default UploadContent;
