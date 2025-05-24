import React from 'react'
import { Suspense } from 'react'
import { BarLoader } from 'react-spinners'

const DashBoardLayout = ({children}) => {
  return (
    <div className='px-8 sm:px-12 md:px-20'>
        <Suspense fallback={<BarLoader width={"100%"} color="orange"/>}>
            {children}
        </Suspense>
    </div>
  )
}

export default DashBoardLayout