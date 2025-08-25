import Navbar from '@/components/Navbar'
import SearchResults from '@/components/SearchResults'

interface SearchPageProps {
  params: Promise<{
    query: string
  }>
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { query } = await params

  return (
    <>
      <Navbar />
      <SearchResults query={query} />
    </>
  )
}
