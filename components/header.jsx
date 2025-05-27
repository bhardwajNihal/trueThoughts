import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'
import { checkUser } from '@/db/checkUser'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'

const Header = async () => {

  await checkUser();

  return (
    <div className='flex justify-between items-center h-12 w-full py-8 px-6 sm:px-10 md:px-16 lg:px-24 backdrop-blur bg-orange-100/40 rounded-b-4xl container mx-auto sm:rounded-b-full border-b-1 border-orange-500'>
      <Link href={"/"}><div className='text-amber-700/80 text-shadow-sm text-xl sm:text-2xl md:text-3xl font-black text-shadow-amber-700/30'>trueThoughts</div></Link>
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

            <Link href={"/journal/add"}>
            <Button
              variant={"journal"} className={"text-white"}>Write new <Plus size={"15px"} />
            </Button>
            </Link>

            <UserButton />
          </SignedIn>
        </ul>
      </div>
    </div>
  )
}

export default Header