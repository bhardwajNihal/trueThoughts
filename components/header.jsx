import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'
import { checkUser } from '@/db/checkUser'

const Header = async() => {

  await checkUser();

  return (
    <div className='flex justify-between items-center h-12 w-full py-8 px-6 sm:px-10 md:px-16 lg:px-24 bg-orange-100/50 backdrop-blur-xs rounded-b-4xl container mx-auto sm:rounded-b-full border-b-1 border-orange-600'>
      <Link href={"/"}><div className="logo h-8 sm:h-10 md:h-11 bg-red-500"><img className='w-full object-cover h-full' src="/logo.png" alt="" /></div></Link>
      <div className="menu">
        <ul className='flex gap-2'>
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </ul>
      </div>
    </div>
  )
}

export default Header