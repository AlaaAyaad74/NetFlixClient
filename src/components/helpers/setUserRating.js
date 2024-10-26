// import axios from "axios";

// const postRating = async (rate, movieId) => {
//   try {
//     const token = localStorage.getItem("authToken");

//     return await axios.post(
//       "http://localhost:3331/rating/rate",
//       {
//         userRating: rate,
//         contentId: movieId,
//         // contentType: "Movie", // assuming contentType is always "Movie"
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Error rating the movie:", error);
//   }
// };
// export default postRating;
import axios from "axios";

const postRating = async (rate, movieId) => {
  try {
    const token = localStorage.getItem("authToken");

    return await axios.post(
      "http://localhost:3331/rating/rate",
      {
        userRating: rate,
        contentId: movieId,
        // contentType: "Movie", // assuming contentType is always "Movie"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      }
    );
  } catch (error) {
    console.error("Error rating the movie:", error);
  }
};
export default postRating;
