import { Movie } from "@/lib/types";
import MovieCard from "./MovieCard";

interface Props {
  title: string,
  movies: Movie[]
}

const CategoryList = ({ title, movies }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-2xl text-white">{title}</h1>
      <div className="flex space-x-4 overflow-x-auto overflow-y-hidden scrollbar-hide">
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie}/>
        ))}
      </div>
      </div>
    
  )
}

export default CategoryList