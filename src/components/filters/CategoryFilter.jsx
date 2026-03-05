import { useMemo, useState } from 'react'
import { categories } from '../../data/dataArrays'
import { Link, Navigate, useNavigate } from 'react-router-dom'

// set searh params here only

const CategoryFilter = ({ products }) => {
  const navigate = useNavigate()
  const handleClick = (searchTerm) => {
    navigate(`/search-category?q=${encodeURIComponent(searchTerm).trim()}`)
  }

  const handleAllClick = () => {
    navigate(`/search-category?q=${encodeURIComponent('all').trim()}`)
  }
  return (
    <div>
      <ul className=' mr-10'>
        {/* <button
          onClick={handleAllClick}
          className='btn bg-neutral capitalize text-white  dark-cat-btn w-full mb-3'
        >
          all
        </button> */}
        {categories.map((i) => {
          return (
            <li key={i} onClick={() => handleClick(i)} className='mb-3'>
              <button className=' btn btn-soft  dark-cat-btn w-full'>
                {i}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryFilter
