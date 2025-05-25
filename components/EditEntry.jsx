"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { Edit } from 'lucide-react';


const EditEntry = ({entryId}) => {

    const router = useRouter();

    return (
        <button
        onClick={() => router.push(`/journal/add?edit=${entryId}`)}
        className="flex items-center text-sm cursor-pointer hover:bg-blue-500 hover:text-white gap-2 sm:px-4 p-1 border border-blue-700 text-blue-500 rounded">
            <Edit size={18} /> <span className='hidden sm:block'>Edit</span>
        </button>
    )
}

export default EditEntry