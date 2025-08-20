"use client";

import { Genre, Movie, Video } from "@/lib/types";
import { AddCircle, CancelRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface Props {
    movie: Movie;
    closeModal: () => void;
}


const Modal =({movie, closeModal}: Props)=>{
    const [video, setVideo] = useState("");
    const [genres, setGenres] = useState<Genre[]>([]);
    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  }
};

const getMovieDetails = async () => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${movie.id}?append_to_response=videos`, options);
       
        const data = await res.json();
      //  console.log("movie details:",data); // For debugging purpose
     //   return data;

     if (data?.videos){
        const index = data.videos.results.findIndex((video: Video) => video.type === 'Trailer');
         setVideo(data.videos.results[index].key)
     }
       if(data?.genres){
        setGenres(data.genres);
       }
    } catch(err){
        console.error("Error fetching movie details:", err);
    }
}
useEffect(() => {
    getMovieDetails();
}, [movie]);



    return (
<div className="fixed inset-0 z-30 bg-black bg-opacity-95 w-full max-w-2xl mx-auto overflow-hidden overflow-y-scroll scrollbar-hide rounded-xl">
  {/* Close Button */}
  <button
    className="absolute right-5 top-5 z-40"
    onClick={closeModal}
  >
    <CancelRounded
      sx={{
        color: "white",
        fontSize: "35px",
        ":hover": { color: "red" },
      }}
    />
  </button>

  {/* Video */}
  <iframe
    src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&loop=1`}
    className="w-full h-64 md:h-80 rounded-t-xl"
    loading="lazy"
    allowFullScreen
  />

  {/* Content */}
  <div className="flex flex-col gap-5 p-6 text-white">
    {/* Title + Add to List */}
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="text-lg font-bold">
          {movie.title || movie.name}
        </p>
        <p className="text-sm text-gray-400">
          Release Date: {movie?.release_date}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-bold">Add To List</p>
        <AddCircle className="cursor-pointer text-red-500" />
      </div>
    </div>

    {/* Overview */}
    <p className="text-sm leading-relaxed text-gray-300">
      {movie?.overview}
    </p>

    {/* Extra Info */}
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex gap-2">
        <p className="font-semibold">Rating:</p>
        <p className="text-gray-300">{movie?.vote_average}</p>
      </div>
      <div className="flex gap-2">
        <p className="font-semibold">Genres:</p>
        <p className="text-gray-300">
          {genres.map((genre) => genre.name).join(", ")}
        </p>
      </div>
    </div>
  </div>
</div>
    );
}
export default Modal;