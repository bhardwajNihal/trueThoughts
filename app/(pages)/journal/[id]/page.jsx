
import { getEntry } from '@/actions/entries';
import DeleteEntryDialog from '@/components/DeleteEntryDialog';
import EditEntry from '@/components/EditEntry';
import { getMoodById } from '@/lib/moods';
import { format } from 'date-fns';
import { htmlToText } from 'html-to-text';
import { Edit, Trash } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const ViewJournalPage = async ({ params }) => {

  const { id } = await params;
  

  const entryDetails = await getEntry(id)


  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Mood image */}
      <div className='w-full flex justify-center'>
        <div className="flex relative h-64 w-2/3 rounded-2xl overflow-hidden shadow-md mb-6">
          <Image
            src={entryDetails?.moodImageUrl || "./fallback.png"}
            alt={entryDetails?.mood || "Mood"}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className='flex items-center justify-between'>
        {/* Title */}
        <div className="text-2xl sm:text-3xl w-[80%] text-wrap font-semibold text-amber-700 mb-2">
          {entryDetails?.title}
        </div>
        {/* Action buttons */}
        <div className="flex gap-3">
          <EditEntry entryId={entryDetails.id}/>

          {/* delete entry */}
          <DeleteEntryDialog entry={entryDetails}/>
        </div>
      </div>

      {/* Date + Mood + Collection */}
      <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-zinc-500 mb-4">
        <div className='flex gap-2'>
          <span className={` p-1 px-2 w-fit bg-amber-200 text-amber-700 rounded-lg`}>{getMoodById(entryDetails?.mood)?.emoji} {entryDetails?.mood}</span>
          <span className="border border-amber-700 text-amber-700 p-1 px-3 rounded-lg">
            📁
            {entryDetails?.collection?.name || "Miscellaneous"}
          </span>
        </div>

        <div className='flex gap-2'>
          <span><span className='text-gray-600 font-semibold'>Created </span>{entryDetails?.createdAt && format(new Date(entryDetails.createdAt), "PPP")}</span>
          <span>
            <span className='text-gray-600 font-semibold'>Updated </span>
            {entryDetails?.updatedAt && format(new Date(entryDetails?.updatedAt), "PPP 'at' p")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-zinc max-w-none mb-6">
        <p>{htmlToText(entryDetails?.content)}</p>
      </div>

    </div>
  )
}

export default ViewJournalPage