"use client"
import { Trash } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import useFetch from '@/app/hooks/useFetch'
import deleteEntry from '@/actions/entries'
import { toast } from 'sonner'
import { ClipLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'


const DeleteEntryDialog = ({entry}) => {

    const router = useRouter();
    const [deleteEntryDialog, setDeleteEntryDialog] = useState(false);
    const CollectionRef = useRef(entry.collection);
    console.log(CollectionRef);
    

    const {
        data : DeleteEntryData,
        loading : isDeletingEntry,
        fn : deleteEntryFn
    } = useFetch(deleteEntry);

    function handleDeleteEntry(){
        deleteEntryFn(entry.id)
    }

    useEffect(() => {
        if(DeleteEntryData && !isDeletingEntry){
            setDeleteEntryDialog(false);
            router.push(CollectionRef.current===null ? "/collection/miscellaneous" : `/collection/${CollectionRef.current.name}`)
            toast.success(`Journal Entry "${entry.title}" Deleted Successfully!`)
        }
    },[DeleteEntryData, isDeletingEntry])

    return (
        <>
        <button
        onClick={() => setDeleteEntryDialog(true)}
            className="flex items-center text-sm cursor-pointer hover:bg-red-500 hover:text-white gap-2 sm:px-4 p-1 border border-red-500 text-red-600 rounded">
            <Trash size={18} /> <span className='hidden sm:block'>Delete</span>
        </button>

        <Dialog open={deleteEntryDialog} onOpenChange={setDeleteEntryDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={"text-lg text-amber-700 font-semibold mb-1"}>Delete "{entry.title}" Journal?</DialogTitle>
                        <DialogDescription>
                            <span className="text-red-500 mb-6">This action cannot be undone. This will permanently delete this Entry!</span>
                            <span className='flex w-full justify-end gap-2 mt-4'>
                                <Button 
                                onClick={() => setDeleteEntryDialog(false)}
                                variant="outline">Cancel</Button>
                                <Button
                                    onClick={handleDeleteEntry}
                                    variant="destructive"
                                    className={"min-w-32"}
                                    >{isDeletingEntry ? <ClipLoader size={"15px"} color='white'/> : "Delete"}</Button>
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DeleteEntryDialog