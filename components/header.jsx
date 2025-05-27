import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'
import { checkUser } from '@/db/checkUser'
import { FolderArchive } from 'lucide-react'

const Header = async() => {

  await checkUser();

  return (
    <div className='flex justify-between items-center h-12 w-full py-8 px-6 sm:px-10 md:px-16 lg:px-24 bg-orange-100/50 backdrop-blur-sm rounded-b-4xl container mx-auto sm:rounded-b-full border-b-1 border-orange-500'>
      <Link href={"/"}><div className="logo h-8 sm:h-10 md:h-11 bg-red-500"><img className='w-full object-cover h-full' src="/logo.png" alt="" /></div></Link>
      <div className="menu">
        <ul className='flex gap-2'>
          <SignedOut>
            <SignInButton>
              <button className='bg-gradient-to-br from-amber-700 to-amber-400 hover:shadow shadow-amber-400 text-white p-1.5 px-4 sm:px-6 lg:px-8 rounded'>Login</button>
            </SignInButton>

            <SignUpButton>
              <button className='border border-amber-700 text-amber-700 p-1.5 px-4 sm:px-6 lg:px-8 rounded hover:shadow shadow-amber-400'>Sign Up</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <button><FolderArchive/>Collections</button>
            <button>Write new</button>
            <UserButton />
          </SignedIn>
        </ul>
      </div>
    </div>
  )
}

export default Header