import React, { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input'
import { addCollectionSchema } from '@/lib/zodSchemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from './ui/textarea'
import useFetch from '@/app/hooks/useFetch'
import { addCollections } from '@/actions/collections'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { ClipLoader } from 'react-spinners'

const AddCollectionModal = ({ open, setOpen, fetchCollections }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(addCollectionSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    const {
        fn: addCollectionFn,
        loading: addCollectionLoading,
        data: addCollectionData
    } = useFetch(addCollections)

    function addCollection(data) {
        addCollectionFn(data)
    }

    useEffect(() => {
        if (addCollectionData && !addCollectionLoading) {
            fetchCollections()      // fetch and set new collections to the state
            toast.success("Collection created successfully!", { richColors: true })
            setOpen(false);
        }
    }, [addCollectionData, addCollectionLoading])


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={`text-amber-700 text-lg text-center`}>Create a new Collection</DialogTitle>
                    <form onSubmit={handleSubmit(addCollection)} className='flex flex-col gap-2 '>
                        <div className="collection-name">
                            <label className='text-amber-700'>Name</label>
                            <Input
                                {...register("name")}
                                placeholder="Career..."
                                className={`bg-gray-100 w-full border border-orange-500 backdrop-blur ${errors.name ? "border-2 border-red-500" : ""}`}
                            />
                            {errors.name && <p className='text-xs md:text-sm text-red-500 px-4'>{errors.name.message}</p>}
                        </div>
                        <div className="collectionDescription">
                            <label className='text-amber-700'>Description</label>
                            <Textarea
                                {...register("description")}
                                placeholder="A collection of journals about my professional life..."
                                className={`bg-gray-100 w-full border border-orange-500 backdrop-blur`}
                            />
                        </div>

                        <div className='text-center'>
                            <Button
                                className={`w-1/2 mt-2`}
                                disabled={addCollectionLoading}
                                variant="journal"
                                type="submit">
                                {addCollectionLoading ? <ClipLoader size={"15px"} color='white' /> : "Submit"}
                            </Button>
                        </div>

                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddCollectionModal