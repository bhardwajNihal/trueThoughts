"use client"
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { CalendarCheck, Search, Trash } from 'lucide-react'
import { MOODS } from '@/lib/moods'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format, formatDate, isSameDay } from 'date-fns'
import { Calendar } from './ui/calendar'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { htmlToText } from 'html-to-text'


const FilterEntriesComp = ({ entries }) => {

    const router = useRouter();
    const [filteredEntries, setFilteredEntries] = useState(entries)

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMood, setSelectedMood] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        // client-side filter logic
        let filtered = entries;         // initially set to hold all entries

        if(searchQuery){
            filtered = filtered.filter(entry => {
                if((entry.title.toLowerCase()).includes(searchQuery.toLowerCase()) || (entry.content.toLowerCase()).includes(searchQuery.toLowerCase())) return entry;
            })
        }

        if(selectedMood){
            filtered = filtered.filter(item => item.mood==selectedMood)
        }

        if(selectedDate){
            filtered = filtered.filter(item => isSameDay(selectedDate,item.createdAt))
        }
        setFilteredEntries(filtered);

    }, [searchQuery, selectedDate, selectedMood])


    function handleClearFilter() {
        setSearchQuery("")
        setSelectedMood("")
        setSelectedDate(null)
    }

    return (
        <div className="entries">

            <div className=''>
                <div className='flex gap-2 justify-end ' >
                    <Button className={`border border-red-500 text-red-500 rounded-lg bg-gray-100 hover:bg-red-600 hover:text-white`}><Trash /><span>Delete Collection</span></Button>
                    {(searchQuery || selectedDate || selectedMood) &&
                        <Button variant="outline"
                            onClick={handleClearFilter}
                        >Clear filters</Button>}
                </div>

                <div className='filters flex flex-col items-end sm:flex-row gap-2 h-14 p-2'>
                    <div className='h-full w-full relative'>
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full h-full px-7 bg-gray-100 border border-gray-300`}
                            placeholder={"Search Entries..."}
                        />
                        <Search size={"15px"} color='gray' className='absolute left-2 top-3.5' />
                    </div>

                    <div className='mood-date-filter flex items-center justify-between gap-2'>
                        {/* search by mood */}
                        <div >
                            <Select onValueChange={setSelectedMood} value={selectedMood}>
                                <SelectTrigger className={`w-36 h-8 sm:h-10 border-gray-300 bg-gray-100 h-full w-full`}>
                                    <SelectValue placeholder="Filter by Mood" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(MOODS).map(mood =>
                                        <SelectItem key={mood.id} value={mood.id}>{mood.emoji} {mood.label}</SelectItem>)}

                                </SelectContent>
                            </Select>
                        </div>

                        {/* search by date */}
                        <div className='h-full border border-gray-300 bg-gray-100 rounded-lg'>
                            <Popover >
                                <PopoverTrigger >
                                    <div className='w-36 h-8  sm:h-10 flex items-center justify-center'>
                                        <span className={`${selectedDate ? "hidden" : ""}`}><CalendarCheck size={"17px"} color='gray' /></span>
                                        <span className={`text-gray-500 ${selectedDate ? "text-gray-700" : ""}`}>{selectedDate ? format(selectedDate, "PPP") : "Pick a Date"}</span>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                    </div>
                </div>

            </div>

            <div className="entries my-5 sm:my-1 px-4">
                <p className='text-sm text-gray-500 backdrop-blur-lg'>showing {filteredEntries.length} out of {entries.length} entries</p>
                {filteredEntries && filteredEntries.length >0 
                ? filteredEntries?.map(entry => 
                <div
                key={entry.id}
                onClick={()=> router.push(`/journal/${entry.id}`)}
                className='bg-gray-100 hover:scale-[1.01] hover:shadow-amber-600 duration-200 shadow-sm shadow-gray-500 rounded-lg my-3 relative px-4 py-2 flex flex-col gap-1'
                >
                <div className='w-full'>{entry.moodDetails?.emoji} <span className='truncate max-w-[80%] text-lg sm:text-xl font-semibold text-amber-600'>{entry.title}</span></div>
                <div className='truncate max-w-[80%] '>{htmlToText(entry.content)}</div>
                <div className='absolute bottom-2 right-3 text-gray-500 text-sm text-gray-700'>{formatDate(entry.createdAt,"PPP")}</div>
                <span className='bg-amber-200 w-fit text-orange-700 px-4 rounded'>{entry.collection?.name}</span>
                </div>)
                
                : <div className='w-full text-center text-amber-500 mt-8 text-lg font-semibold'>No entries found!</div>
            }
            </div>
        </div>
    )
}

export default FilterEntriesComp