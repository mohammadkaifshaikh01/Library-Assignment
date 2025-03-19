import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import ListBooks from '../components/ListBooks'
import Footer from '../components/Footer'
import { Context } from '../context/ContextApi'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  const { isAuth, role } = useContext(Context);
  return (
    <div className='flex'>   
    {isAuth && role === "admin" && <Sidebar  className="fixed h-100vh"/>}

    <div className='w-full'>

      <Navbar />
      <ListBooks />
      <Footer />


    </div>
    </div>
  )
}

export default Dashboard
