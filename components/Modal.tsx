"use client";

import { Genre, Movie, Video } from "@/lib/types";
import { AddCircle, CancelRounded, RemoveCircle } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { User } from "next-auth";
import { useRouter } from "next/navigation";


interface Props {
    movie: Movie;
    closeModal: () => void;
}

interface user{
    email: string;
    username: string;
   favorites: number[];
}

const Modal =({movie, closeModal}: Props)=>{
    const router = useRouter();
    const [video, setVideo] = useState("");
    const [genres, setGenres] = useState<Genre[]>([]);
   const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);

const {data: session} = useSession();


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

//HANDLE MY LIST 
const getUser = async()=>{
    try{
        const res = await fetch(`/api/user/${session?.user?.email}`);
    const data = await res.json();
    setUser(data)
    setIsFavorite(data.favorites.find((item: number) => item === movie.id) ? true : false);
    setLoading(false);
    } catch(err){
        console.log("Error fetching user data:", err);
    }
   
}

useEffect(() => {
    if (session) getUser();
}, [session]);

 const handleMyList = async () => {
    try{
        const res = await fetch(`/api/user/${session?.user?.email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ movieId: movie.id }),
        })
        const data = await res.json();
        setUser(data);
        setIsFavorite(data.favorites.find((item: number) => item === movie.id));
        router.refresh();
    } catch(err){
        console.log("Failed to handle my list", err);
    }
 }
  



    return loading ? <Loader/> : (
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
        {isFavorite ? (<RemoveCircle className="cursor-pointer text-red-500" onClick={handleMyList}/>):(
              <AddCircle className="cursor-pointer text-red-500" onClick={handleMyList} />
        )}
       
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