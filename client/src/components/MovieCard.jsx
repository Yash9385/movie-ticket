import { StarIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const MovieCard = ({ movie }) => {

  const navigate = useNavigate()
  const { image_base_url } = useAppContext()

  // Support both: show object & direct movie object
  const movieData = movie.movie || movie

  const handleNavigate = () => {
    // get correct movie id safely
    const movieId = movieData._id || movieData.id
    if (!movieId) {
      console.log("Movie ID missing", movieData)
      return
    }

    // ✅ Correct route (matches App.jsx)
    navigate(`/movies/${movieId}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-full'>

      {/* Movie Image */}
      <img
        onClick={handleNavigate}
        src={image_base_url + movieData.backdrop_path}
        alt="movie"
        className='rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer'
      />

      {/* Release Year */}
      <p className='text-sm text-gray-400 mt-2'>
        {new Date(movieData.release_date).getFullYear()}
      </p>

      {/* Buy Tickets Button */}
      <button
        onClick={handleNavigate}
        className='px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
        Buy Tickets
      </button>

      {/* Rating */}
      <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
        <StarIcon className="w-4 h-4 text-primary fill-primary" />
        {movieData.vote_average?.toFixed(1) || "N/A"}
      </p>

    </div>
  )
}

export default MovieCard