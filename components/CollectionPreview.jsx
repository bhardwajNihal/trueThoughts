import React from 'react'
import { htmlToText } from 'html-to-text';
import { ArrowDown, ArrowRight } from 'lucide-react';

const CollectionPreview = ({ type, entries, collectionName }) => {
    console.log("entries recieved: ", entries);

    // helper function to extract text from raw html
    function stripHtml(htmlString) {
        if (typeof window !== 'undefined') {
            const doc = new DOMParser().parseFromString(htmlString, 'text/html');
            return doc.body.textContent || "";
        }
        return "";
    }

    if (type == "new") return <div className='h-52 w-64 bg-gray-100 border-gray-400 shadow-lg cursor-pointer duration-200 shadow-gray-400 hover:shadow-gray-500 rounded-xl flex flex-col items-center justify-center'>
        <span className='text-3xl bg-gray-200 text-gray-600 rounded-full p-2 px-4 '>+</span>
        <span className='text-gray-600'>Create a new Collection</span>
    </div>

    return (
        <>
            {<div className="h-52 w-64 bg-gray-100 rounded-xl shadow-xl overflow-hidden relative group hover:scale-[1.02] transition-transform duration-200 ease-in-out">

                {/* Header */}
                <div className="border-b bg-amber-100/80 border-amber-600 px-4 py-2">
                    <h2 className="text-amber-700 text-lg font-semibold tracking-wide">
                        {type === "miscellaneous" ? "Miscellaneous" : collectionName}
                    </h2>
                </div>

                <span className='absolute cursor-pointer bottom-1 left-25 z-50 flex items-center text-sm text-amber-600 gap-2'>show all <ArrowRight className='-mb-1 hover:translate-x-1 duration-300' size={"15px"}/></span>

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
            </div>
            }
        </>
    )
}

export default CollectionPreview