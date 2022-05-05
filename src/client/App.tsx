import React, { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";
import { apiService } from "./services/api-service";
import "./styles/index.css";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleNext = () => {
    if (!videos || index + 1 >= videos.length) return;
    else setIndex(index + 1);
  };

  const handleLike = async () => {
    const receiver_id = videos[index].user_id;

    const data = await apiService("/api/matches", "POST", {
      receiver_id: receiver_id,
      status: 0,
    });

    handleNext();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService("/api/videos");
        setVideos(data);
        setIsLoaded(true);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  // ERROR
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // NOT LOADED
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // LOADED
  return (
    <div className="flex flex-col h-full">
      <NavBar />
      {videos[index] ? (
        <div className="flex flex-col h-full items-center space-y-8 py-8">
          <video
            src={videos[index].url}
            className="h-3/4 aspect-[9/16] bg-black rounded-xl"
            autoPlay
            playsInline
            loop
          />
          <div className="flex space-x-8">
            <button
              onClick={handleNext}
              className="flex h-24 w-24 bg-pink-300 rounded-full items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 fill-pink-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={handleLike}
              className="flex h-24 w-24 bg-pink-500 rounded-full items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 fill-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-full self-center items-center text-gray-500 text-lg font-medium">
          You've reached the end of the line. No more matches found.
        </div>
      )}
    </div>
  );
};

export default App;

{
  /* <form
                action="api/videos/upload"
                method="POST"
                encType="multipart/form-data"
            >
                <input type="file" name="video" accept="video/*" />
                <button type="submit">Submit</button>
            </form> */
}
