import React from 'react'
import Hero from '../../components/Students/Hero'
import SearchBar from '../../components/Students/SearchBar'
import Companies from '../../components/Students/Companies'
import CoursesSection from '../../components/Students/CoursesSection'
import Testimonials from '../../components/Students/Testimonials'
import CallToAction from '../../components/Students/CallToAction'
import Footer from '../../components/Students/Footer'
function Home() {
  return (
    <div className="flex flex-col items-center space-y-7 text-center">
      <Hero />
      <SearchBar />
      <Companies />
      <CoursesSection/>
      <Testimonials/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default Home