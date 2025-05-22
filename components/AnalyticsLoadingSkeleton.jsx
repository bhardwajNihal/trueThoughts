import React from 'react'
import { Skeleton } from './ui/skeleton'

const AnalyticsLoadingSkeleton = () => {
    return (
        <div>
            <div className='grid grid-cols-6 gap-4 justify-between mt-3'>
                <div className='col-span-3 sm:col-span-2 bg-white rounded-lg h-24 p-4 shadow-sm shadow-gray-500'><Skeleton className={`h-2 w-1/3 bg-gray-400`} /></div>
                <div className='col-span-3 sm:col-span-2 bg-white rounded-lg h-24 p-4 shadow-sm shadow-gray-500'><Skeleton className={`h-2 w-1/3 bg-gray-400`} /></div>
                <div className='col-span-6 sm:col-span-2 bg-white rounded-lg h-24 p-4 shadow-sm shadow-gray-500'><Skeleton className={`h-2 w-1/3 bg-gray-400`} /></div>
            </div>
            <div className='h-64 w-full bg-white flex p-8 items-center justify-center my-4 shadow-sm shadow-gray-500'><Skeleton className={`h-full w-full bg-gray-300`}/></div>

        </div>
    )
}

export default AnalyticsLoadingSkeleton