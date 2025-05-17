import React from 'react'

const CollectionsPage = async({params}) => {

    const {collectionId} = await params;

  return (
    <>
    <div>Collection page</div>
    <h2>Collection Id  : {collectionId}</h2>
    </>
  )
}

export default CollectionsPage