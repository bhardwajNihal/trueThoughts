"use client"
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
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
import { addJournalEntry } from '@/actions/addJournalEntry';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { getCollections, getCollectionViaId } from '@/actions/collections';
import AddCollectionModal from '@/components/AddCollectionModal';
import { getEntry, updateJournalEntry } from '@/actions/entries';
import { deleteDraft, getDraft, saveDraft } from '@/actions/draftEntry';
import { Truculenta } from 'next/font/google';
// called dynamic import
// prevent ssr of packages that needs browser window to function, and to be only client-side rendered
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const AddJournalPage = () => {

  const router = useRouter()
  const [addCollectionsPopup, setAddCollectionsPopup] = useState(false);

  // check if the editId is in the search params
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  console.log("edit id  : ", editId);

  const [isEditable, setIsEditable] = useState(false);

  // initializing useform
  // control is used to handle 3rd party components inside hook-form
  const { register,
    handleSubmit,
    control,
    formState: { errors,isDirty },
    reset,
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

  // if editid is provided in the search params
  // -> set isEditable to be true in the 1st mount
  // fetch the entrydetails and populate form with it.
  // show edit button / else show publish button  
  // a cancel button --> on click navigate to the journal entry page with the id.

  useEffect(() => {
    if (editId) {
      setIsEditable(true)
      fetchExistingEntryFn(editId);

    }
  }, [editId])

  const {
    data: existingEntryData,
    loading: existingEntryLoading,
    fn: fetchExistingEntryFn,
  } = useFetch(getEntry)

  useEffect(() => {
    if (isEditable && existingEntryData && !existingEntryLoading) {
      console.log(existingEntryData);

      reset({
        title: existingEntryData.title || "",
        content: existingEntryData.content || "",
        mood: existingEntryData.mood || "",
        collectionId: existingEntryData.collectionId || "",
      })
    }
  }, [isEditable, existingEntryData, existingEntryLoading])


  //Draft functionality.
  // when the write new page loaded
  // check of any draft --> if any --> populate form with it.
  // if not --> goes as normal >> fill form publish and the entry is created.
  const {
    data : draftData,
    loading : fetchingDraft, 
    fn : fetchDraftFn
  } = useFetch(getDraft)

  useEffect(() => {   // fetch draft on normal add page load, not the edit one
    if(!isEditable){
      fetchDraftFn();
    }
  },[isEditable])

  useEffect(()=>{
    // check for the draft, populate the form
      if(!isEditable && draftData && !fetchingDraft){
        reset({
        title : draftData?.title,
        mood : draftData?.mood,
        content : draftData?.content
        })
      }
  },[isEditable,draftData, fetchingDraft])


  // saving draft functionality
  const{
    data : savedDraftData, 
    loading : savingDraft,
    fn : saveDraftFn
  } = useFetch(saveDraft)

  const formData = watch();       // to look for form changes
  async function handleSaveDraft() {
    saveDraftFn(formData)
  }

  useEffect(() => {
    if(savedDraftData && !savingDraft){
      toast.success("Draft saved successfully!", {richColors:true})
    }
  },[savedDraftData, savingDraft])



  //JOURNAL ENTRY
  // calling useFetch hook to invoke server action to add journal entry
  // or editjournalEntry if editId is provided
  const { data: entryActionData,
    loading: entryActionLoading,
    fn: entryActionFn
  } = useFetch(isEditable ? updateJournalEntry : addJournalEntry)

  const onSubmit = async (data) => {

    const formData = {
      ...data,
      ...(isEditable && {id : editId}),     // provide id in case of edit
      // in case of entry updation, if entry is moved to miscellaneous collections
      collectionId : data.collectionId==="misc" ? null : data.collectionId
    }

    entryActionFn(formData)    // calling the fn, passing title, mood, content, and collectionId(optional)
  };
  // if formSubmitted successfully, the data must be returned
  // routing to the collections page after successful journal entry
  useEffect(() => {
    if (entryActionData && !entryActionLoading) {
      console.log("added entry details : ", entryActionData);
      (async () => {
        let collectionDetails; 
        if (entryActionData.collectionId){
          collectionDetails = await getCollectionViaId(entryActionData.collectionId);
          console.log("collection details:", collectionDetails);
        }

      // in case of new entry, delete existing draft
        if (!isEditable) await deleteDraft();

        if (isEditable) {
          router.push(`/journal/${entryActionData.id}`);
        } else {
          router.push(`/collection/${entryActionData.collectionId ? collectionDetails?.name : "miscellaneous"}`);
        }

        toast.success(`Journal entry ${isEditable ? "updated" : "added"} successfully!`, { richColors: true });
        reset();
      })();

    }
  }, [entryActionData, entryActionLoading])


  // FETCHING COLLECTIONS 
  const {
    fn: fetchCollectionFn,
    data: collectionsData,
  } = useFetch(getCollections)

  useEffect(() => {
    fetchCollectionFn();
  }, [])


  return (
    <div>
      <h2 className='text-2xl w-fit sm:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-orange-700 via-amber-500 to-orange-300 text-transparent bg-clip-text py-4'>{isEditable ? "Edit Journal Entry" : draftData ? "You have a saved draft..." : "Have some thoughts? Start Journaling..."}</h2>

      {entryActionLoading && existingEntryLoading && fetchingDraft && <BarLoader width={"100%"} color='orange' />}

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
                  {existingEntryData?.collectionId && (
                    <SelectItem value="misc">
                      Miscellaneous
                    </SelectItem>
                  )}
                  <SelectItem value="new" className={`text-amber-700`}>+ Create new Collection</SelectItem>
                </SelectContent>
              </Select>
            }}
          />
        </div>

        <div className='flex gap-4'>

            {!isEditable && <Button
            disabled={savingDraft && !isDirty}    // isDirty checks if form has changed, comes from useform
            onClick={(e) => {
              e.preventDefault();
              handleSaveDraft()}
            }
            className={`h-9 w-32 sm:w-44 my-6 bg-transparent border border-amber-700 text-amber-700 hover:bg-amber-100`}>
            {savingDraft && <ClipLoader size={"15px"} color='brown' className='mr-1'/>}save as Draft
          </Button>}

          {isEditable && <Button
            onClick={(e) => {
              e.preventDefault();
              router.push(`/journal/${existingEntryData.id}`)
            }
            }
            className={`h-9 w-32 sm:w-44 my-6 bg-transparent border border-amber-700 text-amber-700 hover:bg-amber-100`}>
            cancel
          </Button>}
          <Button
            disabled={entryActionLoading && !isDirty}
            variant="journal"
            className={`h-9 w-32 sm:w-44 my-6`}
            type="submit">
            {entryActionLoading ? <ClipLoader size={"15px"} color='white' />
              : isEditable ? "Update" : "Publish"}
          </Button>
        </div>

      </form>

      <AddCollectionModal open={addCollectionsPopup} setOpen={setAddCollectionsPopup} fetchCollections={fetchCollectionFn} />

    </div>

  )
}

export default AddJournalPage