import React from 'react'

const PageLayout = ({children}) => {
  return (
    <div className='min-h-screen w-full container mx-auto'>{children}</div>
  )
}

export default PageLayout