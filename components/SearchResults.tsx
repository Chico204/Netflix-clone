import { searchMovies } from "@/actions/movieData"
import { Movie } from "@/lib/types"
import MovieCard from "./MovieCard"

interface SearchResultsProps {
  query: string
}

export default async function SearchResults({ query }: SearchResultsProps) {
  const searchedMovies: Movie[] = await searchMovies(query)

  if (searchedMovies.length === 0) {
    return (
      <div className="flex flex-col py-16 px-10">
        <h1 className="text-xl text-white font-bold">No results found</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col py-16 px-10">
      <h1 className="text-xl font-bold text-white">Results for "{query}"</h1>
      <div className="flex items-center justify-center gap-6 lg:gap-10 flex-wrap px-3 sm:px-6 md:px-10 py-20">
        {searchedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
