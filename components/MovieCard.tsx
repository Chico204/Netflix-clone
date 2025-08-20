'use client';
import { baseImgUrl } from "@/lib/constants";
import { Movie } from "@/lib/types";
import { useState } from "react";
import Modal from "./Modal";

const MovieCard = ({ movie }: { movie: Movie }) => {
 const [showModal, setShowModal] = useState(false);

 const openModal = () =>  setShowModal(true);
  const closeModal = () =>  setShowModal(false);

  return (
    <>
    <div className="relative h-24 w-48 sm:h-32 sm:w-60 md:h-36 md:w-72 shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200" onClick={openModal}>
      <img
        src={`${baseImgUrl}${movie?.backdrop_path || movie?.poster_path}`}
        className="object-cover w-full h-full rounded-lg"
        alt={movie?.title || movie?.name}
      />
    </div>
    {showModal && <Modal/>}
    
    </>
  );
};

export default MovieCard;
