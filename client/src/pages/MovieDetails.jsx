import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BlurCircle from '../components/BlurCircle'
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import timeFormat from '../lib/timeFormat'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const MovieDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [show, setShow] = useState(null)

  const {
    axios,
    user,
    getToken,
    fetchFavoriteMovies,
    favoriteMovies,
    image_base_url,
    shows
  } = useAppContext()

  // 🔥 FINAL FIX: Fetch show directly from backend
  useEffect(() => {
    const fetchShow = async () => {
      try {
        const { data } = await axios.get(`/api/show/${id}`)
        if (data.success) {
          setShow(data.show)
        } else {
          setShow(null)
        }
      } catch (error) {
        console.log(error)
        setShow(null)
      }
    }

    fetchShow()
  }, [id])

  const handleFavorite = async () => {
    try {
      if (!user) return toast.error("Please login to proceed")

      const { data } = await axios.post(
        '/api/user/update-favorite',
        { movieId: id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )

      if (data.success) {
        await fetchFavoriteMovies()
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!show) return <Loading />

  return (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>

      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        {/* POSTER */}
        <img
          src={image_base_url + show.movie.poster_path}
          alt="movie"
          className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover'
        />

        {/* DETAILS */}
        <div className='relative flex flex-col gap-3'>
          <BlurCircle top="-100px" left="-100px" />
          <p className='text-primary'>ENGLISH</p>

          <h1 className='text-4xl font-semibold max-w-96 text-balance'>
            {show.movie.title}
          </h1>

          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>

          <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>
            {show.movie.overview}
          </p>

          <p>
            {timeFormat(show.movie.runtime)} •{" "}
            {show.movie.genres.map(g => g.name).join(", ")} •{" "}
            {show.movie.release_date.split("-")[0]}
          </p>

          <div className='flex items-center flex-wrap gap-4 mt-4'>
            <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium'>
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>

            <a
              href="#dateSelect"
              className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium'
            >
              Buy Tickets
            </a>

            <button
              onClick={handleFavorite}
              className='bg-gray-700 p-2.5 rounded-full transition'
            >
              <Heart
                className={`w-5 h-5 ${
                  favoriteMovies.find(m => m.movieId === id)
                    ? 'fill-primary text-primary'
                    : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* DATE SELECT */}
      <div id="dateSelect">
        <DateSelect dateTime={show.dateTime} id={id} />
      </div>

      {/* RECOMMENDED */}
      <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
        {shows.slice(0, 4).map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      <div className='flex justify-center mt-20'>
        <button
          onClick={() => { navigate('/movies'); window.scrollTo(0, 0) }}
          className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium'
        >
          Show more
        </button>
      </div>
    </div>
  )
}

export default MovieDetails