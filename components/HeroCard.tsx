"use client";

import { baseImgUrl } from "@/lib/constants";
import { Movie } from "@/lib/types";
import { InfoOutline, InfoOutlined, PlayCircleOutlineOutlined } from "@mui/icons-material";
import { useState } from "react";
import Modal from "./Modal";


const HeroCard = ({trendingMovie}: {trendingMovie: Movie}) => {
  const [showModal, setShowModal] = useState(false);
   const openModal = () =>  setShowModal(true);
  const closeModal = () =>  setShowModal(false);

  return (
    <>
    <div className="flex flex-col px-10 pt-20 gap-10 max-w-xl">
     <div className="absolute top-0 left-0 -z-10 h-screen w-screen">
            <img  src={`${baseImgUrl}${
              trendingMovie?.backdrop_path || trendingMovie?.poster_path
            }`} alt=""  className="object-cover h-full w-full"/>
            <div className="absolute inset-0 bg-black/60" /> 
 
     </div>
    <h1 className="font-extrabold text-4xl md:text-6xl text-white">{trendingMovie?.title || trendingMovie?.name}</h1>
    <p className="text-white font-bold text-lg">{trendingMovie?.overview}</p>

    <div className="flex gap-8">
        <button className=" flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl cursor-pointer bg-white font-bold hover:bg-red-500 hover:text-white" onClick={openModal}><PlayCircleOutlineOutlined/>Play Now</button>
         <button className=" flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl cursor-pointer bg-gray-400 font-bold hover:bg-red-500 hover:text-black text-white" onClick={openModal}><InfoOutlined/>More Info</button>
    </div>
    </div>
    {showModal && <Modal movie={trendingMovie} closeModal={closeModal}/>}
</>
  );
}
export default HeroCard;