import React from 'react'
 import { useSelector } from 'react-redux'
const Navbar = () => {
  const {tasksList , error} = useSelector((state) => state.task)
  return (
   
    <>
    <h1 className='text-center my-4 text-primary'>Project Management</h1>
    <p className='text-center lead'>{`Currently ${tasksList.length}  tesk(s) Pending`}</p>
    {
      (error !== '')? <h5 className='text-center my-4 text-danger'>{error}</h5> : null
    }
    </>
 
    )
}

export default Navbar