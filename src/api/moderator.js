import axios from 'axios';

const ModeratorApi = {
    addMovie: (payload) => {
        return axios.post('http://localhost:3331/movies/add-movie', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure the token is set
            }
        });
    },

    uploadContent: (formData) => {
        return axios.post('http://localhost:5000/api/content/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJtb3ZpZW1vZEBleGFtcGxlLmNvbSIsInJvbGUiOiJtb3ZpZU1vZGVyYXRvciIsImlzUHJpbWUiOmZhbHNlLCJpYXQiOjE3MjkwMTE3NTIsImV4cCI6MTcyOTAxNTM1Mn0.x9MMek8XxPnYTrm3WZOlvfBF0DVS1IBHkf51dpw_Kjo`
            }
        });
    }
};

export default ModeratorApi;
