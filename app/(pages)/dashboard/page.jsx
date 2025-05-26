import { getCollections } from '@/actions/collections';
import { getEntries } from '@/actions/entries'
import CollectionPreview from '@/components/CollectionPreview';
import React from 'react'
import MoodAnalytics from '@/components/MoodAnalytics';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Dashboard = async () => {

  const entries = await getEntries();
  const collections = await getCollections()
  // console.log("entries : ", entries);
  // console.log("collections : ", collections);

  const organizeEntriesByCollection = entries.reduce((acc, entry) => {
    const collectionIdKey = entry.collectionId || "miscellaneous";
    if (!acc[collectionIdKey]) {
      acc[collectionIdKey] = []
    }
    acc[collectionIdKey].push(entry);
    return acc;
  }, {})

  // console.log("Organized entries : ", organizeEntriesByCollection);

  return (
    <div >

      <h2 className='text-2xl w-fit sm:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-orange-700 via-amber-500 to-orange-300 text-transparent bg-clip-text py-4'>DashBoard</h2>

      <div className="mood-graph min-h-[40vh]">
        <MoodAnalytics />
      </div>


      <div className="collections">

        <div className='flex flex-col gap-3 md:flex-row md:justify-between mt-4'>
          <h2 className='text-3xl font-semibold md:5xl text-amber-700 mb-3 text-center sm:text-start'>Collections</h2>
          <Link href={"/collection/all"} className='flex justify-end'>
            <Button
              variant={"ghost"}
              className={"flex justify-center items-center gap-1 text-amber-700 text-sm"}>
              <span>show all entries</span> <ArrowRight color='brown' size={"15px"} />
            </Button>
          </Link>

        </div>

        <div className="items grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <CollectionPreview type={"new"} />

          <CollectionPreview
            type={"miscellaneous"}
            entries={organizeEntriesByCollection["miscellaneous"] || []} />

          {collections && collections.length > 0 &&
            collections.map(collection => (
              <CollectionPreview
                key={collection.id}
                type={"collection"}
                entries={organizeEntriesByCollection[collection.id] || []}
                collectionName={collection.name} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard