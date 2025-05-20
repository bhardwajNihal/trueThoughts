"use client"
import dynamic from 'next/dynamic';
import React, { useEffect, useReducer, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import 'react-quill-new/dist/quill.snow.css';
import { zodResolver } from "@hookform/resolvers/zod"
import { journalEntrySchema } from '@/lib/zodSchemas';
import { BarLoader, ClipLoader } from 'react-spinners';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getMoodById, MOODS } from '@/lib/moods';
import { Button } from '@/components/ui/button';
import useFetch from '@/app/hooks/useFetch';
import { addJournalEntry } from '@/actions/journalEntry';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getCollections } from '@/actions/collections';
import AddCollectionModal from '@/components/AddCollectionModal';
// called dynamic import
// prevent ssr of packages that needs browser window to function, and to be only client-side rendered
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const AddJournalPage = () => {

  const router = useRouter()
  const [addCollectionsPopup, setAddCollectionsPopup] = useState(false);


  // initializing useform
  // control is used to handle 3rd party components inside hook-form
  const { register,
    handleSubmit,
    control,
    formState: { errors },
    watch } = useForm({
      resolver: zodResolver(journalEntrySchema),
      defaultValues: {
        title: "",
        content: "",
        mood: "",
        collectionId: ""
      }
    })
  // to render content title reactively
  const selectedMood = watch("mood");

  //JOURNAL ENTRY
  // calling useFetch hook to invoke server action to make journal entry
  const { data: addJournalData,
    loading: addJournalLoading,
    fn: addJournalFn
  } = useFetch(addJournalEntry)

  const onSubmit = async (data) => {
    addJournalFn({ ...data })    // calling the fn, passing title, mood, content, and collectionId(optional)

  };
  // if formSubmitted successfully, the data must be returned
  // routing to the collections page after successful journal entry
  useEffect(() => {
    if (addJournalData && !addJournalLoading) {
      router.push(`/collections/${addJournalData.collectionId ? addJournalData.collectionId : "miscellaneous"}`)
      toast.success("Journal entry added successfully!", { richColors: true });
    }
  }, [addJournalData, addJournalLoading])


  // FETCHING COLLECTIONS 
  const {
    loading: collectionLoading,
    error: collectionError,
    fn: fetchCollectionFn,
    data: collectionsData,
  } = useFetch(getCollections)

  useEffect(() => {
    fetchCollectionFn();
  }, [])


  return (
    <div>
      <h2 className='text-2xl w-fit sm:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-orange-700 via-amber-500 to-orange-300 text-transparent bg-clip-text py-4'>Have some thoughts? Start Journaling...</h2>

      {addJournalLoading && <BarLoader width={"100%"} color='orange' />}

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="title">
          <label className='text-lg md:text-xl font-semibold text-amber-700'>Title</label>
          <Input
            {...register("title")}
            placeholder="Enter Journal Entry title..."
            className={`bg-gray-100 border border-orange-500 backdrop-blur ${errors.title ? "border-2 border-red-500" : ""}`}
          />
          {errors.title && <p className='text-xs md:text-sm text-red-500 px-4'>{errors.title.message}</p>}
        </div>

        <div className="mood-dropdown py-4">
          <label className='text-lg md:text-xl font-semibold text-amber-700'>How are you feeling today?</label>
          {/* shadcn component has their own component value handling mechanism, but we want react hook form to control all the form related fields, so we have to wrap inside controller and provide specific field options */}
          <Controller
            name='mood'
            control={control}
            render={({ field }) => {
              return <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={`w-full bg-gray-100 backdrop-blur border border-orange-500 ${errors.mood ? "border-2 border-red-500" : ""}`}>
                  <SelectValue placeholder="Select a mood..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(MOODS).map(mood => <SelectItem key={mood.id} value={mood.id}>{mood.emoji} {mood.label}</SelectItem>)}

                </SelectContent>
              </Select>
            }}
          />
          {errors.mood && <p className='text-xs md:text-sm text-red-500 px-4'>{errors.mood.message}</p>}
        </div>

        <div className={`content`}>
          <label className='text-lg md:text-xl font-semibold text-amber-700'>
            {getMoodById(selectedMood)?.prompt ?? "Elaborate your thoughts..."}
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) =>
              <ReactQuill
                className={`backdrop-blur bg-gray-100 border border-orange-500 rounded-lg overflow-hidden`}
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link'],
                    ['clean']
                  ]
                }}
              />
            }
          />
          {errors.content && <p className='text-xs sm:text-sm text-red-500'>{errors.content.message}</p>}
        </div>

        {/* collection input */}

        <div className="collection py-4">
          <label className='md:text-lg font-semibold text-amber-700'>
            Organize journals by adding to a collection
          </label>
          <Controller
            name='collectionId'
            control={control}
            render={({ field }) => {
              return <Select onValueChange={(value) => {
                if (value == "new") {
                  setAddCollectionsPopup(true)
                }
                else {
                  field.onChange(value)
                }
              }} value={field.value}>
                <SelectTrigger className={`w-full bg-gray-100 backdrop-blur border border-orange-500 ${errors.mood ? "border-2 border-red-500" : ""}`}>
                  <SelectValue placeholder="Choose a Collection..." />
                </SelectTrigger>
                <SelectContent>
                  {collectionsData && collectionsData.map(collection =>
                    <SelectItem key={collection.id} value={collection.id}>{collection.name}</SelectItem>
                  )}
                  <SelectItem value="new" className={`text-amber-700`}>+ Create new Collection</SelectItem>
                </SelectContent>
              </Select>
            }}
          />
        </div>

        <Button disabled={addJournalLoading} variant="journal" className={`h-9 w-32 sm:w-44 my-6`} type="submit">{addJournalLoading ? <ClipLoader size={"15px"} color='white' /> : "Publish"}</Button>

      </form>

      <AddCollectionModal open={addCollectionsPopup} setOpen={setAddCollectionsPopup} fetchCollections={fetchCollectionFn}/>

    </div>

  )
}

export default AddJournalPage