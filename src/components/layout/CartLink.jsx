import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCart,
  selectCartItemCount,
  selectCartItems,
} from '../../features/cart/cartSlice'
import { selectUser } from '../../features/user/userSlice'

const CartLink = ({ setIsNavOpen, mobile }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const loggedInUser = useSelector(selectUser)
  const dispatch = useDispatch()
  const itemsCount = useSelector(selectCartItemCount)
  useEffect(() => {
    if (loggedInUser) dispatch(fetchCart())

    return () => {}
  }, [loggedInUser])

  // Replace the isDarkMode useEffect with this:
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }

    // Check on mount
    checkDarkMode()

    // Watch for class changes on <html>
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <Link
      to='cart'
      onClick={() => setIsNavOpen(false)}
      className={`md:hidden ${mobile && 'mt-5'}`}
    >
      <span className='relative'>
        {/* force to black on mobile AND dark mode */}
        <i
          className={`fa-solid text-3xl fa-cart-shopping mr-7 ${
            mobile ? 'text-black' : isDarkMode ? 'text-white' : 'text-black'
          }`}
        ></i>
        {loggedInUser !== null && itemsCount === null ? (
          // spinner - only when logged in but cart not yet loaded
          <div className='absolute top-[-25px] right-[3px] indicator-item indicator-middle indicator-start badge badge-secondary'>
            <div className='w-[8px] h-[8px] bg-white rounded-full animate-ping'></div>
          </div>
        ) : (
          // show count, or 0 if not logged in / cart empty
          <span className='absolute top-[-25px] right-[3px] indicator-item indicator-middle indicator-start badge badge-secondary'>
            {itemsCount || 0}
          </span>
        )}
      </span>
    </Link>
  )
}

export default CartLink
