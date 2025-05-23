
import { getCollection } from '@/actions/collections';
import { getEntries } from '@/actions/entries';
import { ArrowLeft } from 'lucide-react';
import React from 'react'
import Link from 'next/link';
import FilterEntriesComp from '@/components/FilterEntriesComp';

const CollectionsPage = async ({ params }) => {

    const { collectionName } = await params;
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
        <div className='p-4 md:px-8 lg:px-16'>

            <div>
                <Link href={"/dashboard"}
                    className='border text-amber-700 w-fit flex items-center justify-center gap-2 border-orange-600 rounded-lg bg-orange-100/50 backdrop-blur-sm py-1 px-6 my-2 sm:px-10 cursor-pointer hover:bg-orange-100'>
                    <span><ArrowLeft size={"17px"} className='-mb-1' /></span> Back to Dashboard
                </Link>
            </div>
            <h2 className='text-2xl w-fit sm:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-orange-700 via-amber-500 to-orange-300 text-transparent bg-clip-text pt-2 pb-1'>{collectionName} journals</h2>
            
            {/* render entries*/}
            <FilterEntriesComp entries={entries} collectionName={collectionName}/>

        </div>
    )
}

export default CollectionsPage