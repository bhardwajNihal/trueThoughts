import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Suspense } from 'react'
import { BarLoader } from 'react-spinners'

const CollectionLayout = ({ children }) => {
    return (
        <div className='p-4 md:px-8 lg:px-16'>
            <div>
                <Link href={"/dashboard"}
                    className=' text-amber-700 w-fit flex items-center justify-center gap-2 py-1 px-6 my-2 sm:px-10 cursor-pointer hover:bg-orange-100 rounded-lg duration-200'>
                    <span><ArrowLeft size={"17px"} className='-mb-1' /></span> Back to Dashboard
                </Link>
            </div>
            <Suspense fallback={<BarLoader width={"100%"} color="orange"/>}>
                {children}
            </Suspense>
        </div>
    )
}

export default CollectionLayout