import { ArrowRight } from 'lucide-react'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import MovieCard from './MovieCard'
import { useAppContext } from '../context/AppContext'

const FeaturedSection = () => {

    const navigate = useNavigate()
    const { shows } = useAppContext()
    const scrollRef = useRef(null)

    const scrollRight = () => {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>

      <div className='relative flex items-center justify-between pt-20 pb-10'>
        <BlurCircle top='0' right='-80px'/>
        <p className='text-gray-300 font-medium text-lg'>Now Showing</p>
        <button onClick={()=> navigate('/movies')} className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer '>
            View All 
            <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5'/>
        </button>
      </div>

      {/* Scroll Container */}
      <div className='relative'>
        
        {/* Movies Row */}
        <div ref={scrollRef} className='flex gap-6 overflow-x-auto pb-4 mt-8 scrollbar-hide'>
          {shows.slice(0, 8).map((show)=>(
              <div key={show._id} className='min-w-[260px]'>
                <MovieCard movie={show}/>
              </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button 
          onClick={scrollRight}
          className='absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black p-3 rounded-full'>
          <ArrowRight className='w-6 h-6 text-white'/>
        </button>

      </div>

      <div className='flex justify-center mt-20'>
        <button onClick={()=> {navigate('/movies'); scrollTo(0,0)}}
         className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>
         Show more
        </button>
      </div>
    </div>
  )
}

export default FeaturedSection