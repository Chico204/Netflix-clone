import { fetchGenreMovies } from "@/actions/movieData"
import CategoryList from "@/components/CategoryList"
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import { Genre } from "@/lib/types"

const Home = async () => {
  const genres = await fetchGenreMovies()
  const example = genres.slice(0,2)
  console.log(example) // For debugging purpose
 
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="flex flex-col gap-8 mt-16 pl-10">
        {genres.map((genre: Genre) => (
          <CategoryList key={genre.id} title={genre.name} movies={genre.movies} />
        ))}
      </div>
    </div>
  )
}

export default Home