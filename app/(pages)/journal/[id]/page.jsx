import React from 'react'

const ViewJournalPage = async({params}) => {

    const {id} = await params;

  return (
    <>
    <div>ViewJournalPage</div>
    <h2>Journal Id  : {id} </h2>
    </>
  )
}

export default ViewJournalPage