import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPoliicy from '../components/OurPoliicy'

const Home = () => {
  return (
    <div>
    
        <Hero/>
        <LatestCollection/>
        <BestSeller/>
        <OurPoliicy/>
    </div>
  )
}

export default Home