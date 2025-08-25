import { fetchMovieDetails } from "@/actions/movieData";
import { fetchMyList } from "@/actions/user";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";
import { Movie } from "@/lib/types";

const MyList = async () => {
  const myList = await fetchMyList();

  const MyListDetails = await Promise.all(
    myList.map(async (movieId: number) => {
      const movieDetails = await fetchMovieDetails(movieId)
      return movieDetails;
    })
  )
  return (
   <>
   <Navbar/>
   <div className="flex items-center justify-center gap-6 lg:gap-10 flex-wrap px-3 sm:px-6 md:px-10 py-20">
      {MyListDetails.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
   </div>
   </>
  );
}
export default MyList;