"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import {BarLoader} from "react-spinners"
import { ArrowLeft } from 'lucide-react';

const JournalLayout = ({ children }) => {
    const router = useRouter();

    return (
        <div className='min-h-screen w-full container mx-auto py-8 px-6 sm:px-12 md:px-20'>
            <div
                onClick={() => router.push("/dashboard")}
                className=' text-amber-700 w-fit flex items-center justify-center gap-2 py-1 px-6 my-2 sm:px-10 cursor-pointer hover:bg-orange-100 rounded-lg duration-200'>
                <span><ArrowLeft size={"17px"} className='-mb-1'/></span> Back to Dashboard
            </div>
            <Suspense fallback={<BarLoader width={"100%"} color='orange'/>}>{children}</Suspense>
        </div>
    )
}

export default JournalLayout