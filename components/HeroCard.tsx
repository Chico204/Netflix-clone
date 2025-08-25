"use client";

import { baseImgUrl } from "@/lib/constants";
import { Movie } from "@/lib/types";
import {
  InfoOutlined,
  PlayCircleOutlineOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import Modal from "./Modal";

const HeroCard = ({ trendingMovie }: { trendingMovie: Movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // fetch random trailer
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/movie/${trendingMovie.id}/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch trailer");

        const data = await res.json();

        const trailers = Array.isArray(data.results)
          ? data.results.filter(
              (vid: any) =>
                vid.site === "YouTube" && vid.type === "Trailer"
            )
          : [];

        if (trailers.length > 0) {
          const randomTrailer =
            trailers[Math.floor(Math.random() * trailers.length)];
          setTrailerKey(randomTrailer.key);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (trendingMovie?.id) {
      fetchTrailer();
    }
  }, [trendingMovie]);

  return (
    <>
      {/* Background trailer */}
      <div className="absolute inset-0 -z-10 h-screen w-screen overflow-hidden">
        {trailerKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}`}
            className="absolute top-0 left-0 w-full h-full object-cover"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <img
            src={`${baseImgUrl}${
              trendingMovie?.backdrop_path || trendingMovie?.poster_path
            }`}
            alt=""
            className="object-cover w-full h-full"
          />
        )}

        {/* Dark overlay over entire video */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Gradient + blur at top for navbar readability */}
        <div className="absolute top-0 left-0 w-full md:h-25 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm" />
      </div>

      {/* Hero content */}
      <div className="flex flex-col px-10 pt-28 gap-6 max-w-2xl">
        <h1 className="font-extrabold text-4xl md:text-6xl text-white drop-shadow-lg">
          {trendingMovie?.title || trendingMovie?.name}
        </h1>
        <p className="text-white font-medium text-lg line-clamp-4 drop-shadow-md">
          {trendingMovie?.overview}
        </p>

        <div className="flex gap-6 mt-4">
          <button
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl cursor-pointer bg-white font-bold hover:bg-red-500 hover:text-white transition"
            onClick={openModal}
          >
            <PlayCircleOutlineOutlined />
            Play Now
          </button>
          <button
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl cursor-pointer bg-gray-500/70 font-bold hover:bg-red-500 hover:text-white text-white transition"
            onClick={openModal}
          >
            <InfoOutlined />
            More Info
          </button>
        </div>
      </div>

      {showModal && <Modal movie={trendingMovie} closeModal={closeModal} />}
    </>
  );
};

export default HeroCard;
