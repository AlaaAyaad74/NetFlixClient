const apiConfig = {
  apiKey: "537b2b4f531f7f24cf82bbac9260de77",
  baseUrl: "https://api.themoviedb.org/3/",//http://127.0.0.1:3331
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
