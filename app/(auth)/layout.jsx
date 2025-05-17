import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='min-h-screen w-full flex items-center justify-center pt-8'>{children}</div>
  )
}

export default AuthLayout