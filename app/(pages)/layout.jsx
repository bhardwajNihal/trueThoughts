import React from 'react'

const PageLayout = ({children}) => {
  return (
    <div className='min-h-screen w-full container mx-auto border border-orange-600 rounded-xl bg-orange-100 my-4'>{children}</div>
  )
}

export default PageLayout