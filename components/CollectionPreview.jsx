"use client"
import React, { useState } from 'react'
import { htmlToText } from 'html-to-text';
import { ArrowRight, Folder } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import AddCollectionModal from './AddCollectionModal';
import { getCollections } from '@/actions/collections';
import useFetch from '@/app/hooks/useFetch';
import { useRouter } from 'next/navigation';

const CollectionPreview = ({ type, entries, collectionName }) => {
    // console.log("entries recieved: ", entries);
    const router = useRouter()
    const [addCollectionModalOpen, setAddCollectionModalOpen] = useState(false);
    const {fn:getCollectionsFn} = useFetch(getCollections);

    return (
        <>
            {(type == "new") 
            ? <div
                onClick={() => setAddCollectionModalOpen(true)}
                className='h-56 bg-gray-100 border-gray-400 shadow-lg cursor-pointer duration-200 shadow-gray-400 hover:shadow-gray-500 rounded-xl flex flex-col items-center justify-center'>
                <span className='text-3xl text-gray-600 rounded-full p-2 px-4 '>+</span>
                <span className='text-gray-600'>Create a new Collection</span>
            </div>

            :<div 
            onClick={() => router.push(`/collection/${type=="miscellaneous" ? "miscellaneous" : collectionName}`)}
            className="h-56 bg-gray-100 rounded-xl shadow-xl overflow-hidden relative group hover:scale-[1.02] transition-transform duration-200 ease-in-out">

                {/* Header */}
                <div className="bg-amber-100/80 px-4 py-2">
                    <h2 className="text-amber-700 text-lg font-semibold tracking-wide flex items-center gap-1">
                        <Folder />
                        {type === "miscellaneous" ? "Miscellaneous" : collectionName}
                    </h2>
                    <div className='w-full text-xs flex justify-between text-amber-600 items-center'>
                        <span>{entries?.length} entries</span>
                        {entries.length > 0 && <span>{formatDistanceToNow(new Date(entries[0].createdAt), { addSuffix: true })}</span>}
                    </div>
                </div>

                <div className='absolute cursor-pointer w-full bg-gradient-to-t from-amber-400 to-transparent bottom-0 flex justify-center items-end p-2 h-14 hover:h-full hover:text-amber-800 duration-300 text-amber-600 z-50 flex items-center text-sm gap-2'>open collection <ArrowRight className='mb-[2px]' size={"15px"} /></div>

                {/* Entries */}
                <div className="relative p-3 space-y-2">
                    {entries && entries.length > 0 ? (
                        entries.slice(0, 2).map((entry) => (
                            <div
                                key={entry.id}
                                className=" backdrop-blur-sm border border-amber-200 text-amber-800 rounded-md px-3 py-2 flex flex-col shadow-sm hover:shadow-md transition duration-150"
                            >
                                <span className="font-medium truncate">{entry.title}</span>
                                <span className="text-xs text-gray-600 truncate">
                                    {htmlToText(entry.content)}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500 text-sm italic">No entries</div>
                    )}
                </div>
            </div>}
            
            <AddCollectionModal open={addCollectionModalOpen} setOpen={setAddCollectionModalOpen} fetchCollections={getCollectionsFn}/>
        </>
    )
}

export default CollectionPreview