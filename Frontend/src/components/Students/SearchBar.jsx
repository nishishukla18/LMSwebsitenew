import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';

function SearchBar(data) {
  const navigate = useNavigate()
  const [input, setInput] = React.useState(data?data:'')
  const searchHandler = (e)=>{
     e.preventDefault()
     navigate('/course-list/'+input)
  }
  return (
    <div>
      <form onSubmit={searchHandler} className='max-w-xl w-full flex items-center bg-white rounded border border-gray-500 md:h-14 h-12'>
        <img src={assets.search_icon} alt="" className='md:auto w-10 px-3' />
        <input onChange={e=>setInput(e.target.value)} value={input} type="text" placeholder='Search for courses' className='w-full h-full outline-none text-gray-500/80'/>
        <button type='submit' className='bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1 cursor-pointer'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar