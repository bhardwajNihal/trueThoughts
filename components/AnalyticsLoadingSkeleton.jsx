import React from 'react'
import { Skeleton } from './ui/skeleton'

const AnalyticsLoadingSkeleton = () => {
    return (
        <div>
            <div className='grid cols-9 gap-2 justify-between '>
                <div className='col-span-3 bg-white rounded-lg h-24 p-4'><Skeleton className={`h-2 w-1/3 bg-gray-400`} /></div>
                <div className='col-span-3 bg-white rounded-lg h-24 p-4'><Skeleton className={`h-2 w-1/3 bg-gray-400`} /></div>
                <div className='col-span-3 bg-white rounded-lg h-24 p-4'><Skeleton className={`h-2 w-1/3 bg-gray-400`} /></div>
            </div>
            <Skeleton className={`h-24 w-48 bg-white border border-amber-700`} />
        </div>
    )
}

export default AnalyticsLoadingSkeleton