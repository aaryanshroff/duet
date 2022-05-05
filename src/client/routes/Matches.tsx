import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { apiService } from "../services/api-service";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService("/api/matches");
        setMatches(data);
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

  return (
    <div>
      <NavBar />
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 px-6 py-6">
        {matches.map((match, key) => (
          <div
            key={key}
            className="flex flex-col space-y-2 px-3 py-2 border rounded-lg"
          >
            <h1 className="font-semibold">
              {match.first_name} {match.last_name}
            </h1>
            <h2 className="">{match.email}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
