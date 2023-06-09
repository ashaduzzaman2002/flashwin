import React from 'react'
import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

const Home = () => {
  return (
    <div className='container'>
        <BottomNav />
        <Link to={'/login'}>Go to Login</Link>
        <Link to={'/try-luck'}>Try Luck</Link>
    </div>
  )
}

export default Home