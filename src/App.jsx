import VideoPlayer from "./components/Player/Player";

function App() {
  const dummyEpisodes = [
    {
      videoSrc: "./M1.mp4",
      title: "Episode 1: The Beginning",
      description: "In this episode, we explore the origins of the story.",
      image: "/1.jpg",
    },
    {
      videoSrc: "./M1.mp4",
      title: "Episode 2: The Adventure Continues",
      description: "The characters embark on a thrilling journey.",
      image: "https://example.com/image2.jpg",
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=RlPNh_PBZb4",
      title: "Episode 3: The Final Showdown",
      description: "The epic conclusion to the series.",
      image: "https://example.com/image3.jpg",
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <VideoPlayer episodes={dummyEpisodes} />
    </div>
  );
}

export default App;
