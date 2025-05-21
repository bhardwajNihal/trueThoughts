
import { getCollections } from '@/actions/collections';
import { getEntries } from '@/actions/entries'
import React from 'react'

const Dashboard = async() => {

    const entries = await getEntries();
    const collections = await getCollections()
    console.log("entries : ",entries);
    console.log("collections : ", collections);

    const organizeEntriesByCollection = entries.reduce((acc,entry)=>{
      const collectionIdKey = entry.collectionId || "miscellaneous";
      if(!acc[collectionIdKey]){
        acc[collectionIdKey] = []
      }
      acc[collectionIdKey].push(entry);
      return acc;
    },{})

    console.log("Organized entries : ", organizeEntriesByCollection);
    
  return (
    <div>
      //mood graph
      // collections options
    </div>
  )
}

export default Dashboard