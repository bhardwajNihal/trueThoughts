
import { getCollection } from '@/actions/collections';
import { getEntries } from '@/actions/entries';
import { ArrowLeft } from 'lucide-react';
import React from 'react'
import Link from 'next/link';
import FilterEntriesComp from '@/components/FilterEntriesComp';

const CollectionsPage = async ({ params }) => {

    const { collectionName } = await params;
    const collectionDetails = await getCollection(collectionName);
    let entries = [];

    if (collectionName == "all") {
        entries = await getEntries();
    }
    if (collectionName === "miscellaneous") {
        entries = await getEntries({ collectionId: "miscellaneous" })
        console.log(entries);

    }
    else {
        const collectionDetails = await getCollection(collectionName);
        entries = await getEntries({ collectionId: collectionDetails?.id })
        console.log("---Entries--- : ", entries);
    }


    return (
        <>

            <h2 className='text-2xl w-fit sm:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-orange-700 via-amber-500 to-orange-300 text-transparent bg-clip-text pt-2 pb-1'>{collectionName} journals</h2>
            <p className='text-gray-500 backdrop-blur'>{collectionDetails?.description && collectionDetails.description}</p>
            {/* render entries*/}
            <FilterEntriesComp entries={entries} collectionName={collectionName}/>

        </>
    )
}

export default CollectionsPage