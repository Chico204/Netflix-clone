import { Movie } from "@/lib/types";

interface Props {
    movie: Movie;
    closeModal: () => void;
}


const Modal =({movie, closeModal}: Props)=>{
    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  }
};

const getMovieDetails = async () => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${movie.id}`, options);
       
        const data = await res.json();
        console.log(data); // For debugging purpose
        return data;
    } catch(err){
        console.error("Error fetching movie details:", err);
    }
}


fetch('https://api.themoviedb.org/3/movie/movie_id?language=en-US', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
    return (
   <div></div>
    );
}
export default Modal;