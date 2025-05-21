
import { getCollections } from '@/actions/collections';
import { getEntries } from '@/actions/entries'
import CollectionPreview from '@/components/CollectionPreview';
import React from 'react'

const Dashboard = async () => {

  const entries = await getEntries();
  const collections = await getCollections()
  console.log("entries : ", entries);
  console.log("collections : ", collections);

  const organizeEntriesByCollection = entries.reduce((acc, entry) => {
    const collectionIdKey = entry.collectionId || "miscellaneous";
    if (!acc[collectionIdKey]) {
      acc[collectionIdKey] = []
    }
    acc[collectionIdKey].push(entry);
    return acc;
  }, {})

  console.log("Organized entries : ", organizeEntriesByCollection);

  return (
    <div className='p-4 sm:p-12 md:p-24'>
      <div className="mood-graph min-h-[40vh]"></div>

      <div className="collections">
        <h2 className='text-3xl font-semibold md:5xl text-amber-700 mb-3 text-center sm:text-start'>Collections</h2>
        <div className="items flex justify-center sm:justify-start flex-wrap gap-8">
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