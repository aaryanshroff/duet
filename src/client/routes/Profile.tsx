import React, { useEffect, useState } from "react";
import { UserTable } from "../../server/db/models";
import Spinner from "../components/Spinner";
import { NavBar } from "../components/NavBar";
import { apiService } from "../services/api-service";

const Profile = () => {
  const [user, setUser] = useState<UserTable>(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService("/api/users");
        setUser(data[0]);
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleUpload = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("video", file);
        setIsUploading(true);
        const data = await apiService(
          "/api/videos",
          "POST",
          formData,
          "multipart/form-data"
        );
        setUser((user) => {
          return { ...user, url: data.url };
        });
        setIsUploading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await apiService("/api/videos", "DELETE", {
        url: user.url,
      });
      setUser((user) => ({ ...user, url: "" }));
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen">
      <NavBar />
      <main className="h-full p-6">
        <h1 className="font-bold text-2xl">Profile</h1>
        <div className="py-3 text-lg">
          {user.first_name} {user.last_name}
        </div>
        <h1 className="font-bold text-2xl py-4">Your profile video</h1>
        {user.url ? (
          <>
            <video
              src={user.url}
              className="h-1/4 aspect-[9/16] bg-black rounded-xl"
              autoPlay
              playsInline
            />
            <button className="btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </>
        ) : (
          <>
            <div className="w-1/4">
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="opacity-0 h-0 w-0"
              />
              <label
                htmlFor="file"
                className="text-sm border border-dashed font-semibold items-center rounded-lg  hover:bg-gray-50 hover:text-blue-700  flex justify-center py-10 cursor-pointer"
              >
                {!isUploading ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span className="ml-3">Upload video</span>{" "}
                  </>
                ) : (
                  // Spinner
                  <Spinner />
                )}
              </label>
            </div>
            <button
              onClick={handleUpload}
              className="btn-primary"
              disabled={isUploading || !file}
            >
              Submit
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;
