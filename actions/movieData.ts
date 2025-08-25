import { getApiResponse } from "@/lib/requests"
import { Movie } from "@/lib/types"

export const fetchTrending = async (): Promise<Movie[]> => {
  const data = await getApiResponse("/trending/movie/week")
  return data.results as Movie[]
}

export const fetchGenreMovies = async (): Promise<
  { id: number; name: string; movies: Movie[] }[]
> => {
  const data = await getApiResponse("/genre/movie/list")
  const genres = data.genres as { id: number; name: string }[]

  for (const genre of genres) {
    const res = await getApiResponse(`/discover/movie?with_genres=${genre.id}`)
    // attach movies to each genre
    ;(genre as any).movies = res.results as Movie[]
  }

  return genres as { id: number; name: string; movies: Movie[] }[]
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const data = await getApiResponse(`/search/movie?query=${query}`)
  return data.results as Movie[]
}

export const fetchMovieDetails = async (id: number): Promise<Movie> => {
  const movieDetails = await getApiResponse(
    `/movie/${id}?append_to_response=videos`
  )
  return movieDetails as Movie
}
