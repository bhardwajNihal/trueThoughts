"use client"
import { getAnalytics } from '@/actions/getAnalyticsData'
import useFetch from '@/app/hooks/useFetch'
import React, { useEffect, useState } from 'react'
import AnalyticsLoadingSkeleton from './AnalyticsLoadingSkeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getMoodById, getMoodTrend } from '@/lib/moods'

const MoodAnalytics = () => {

    const [period, setPeriod] = useState("7d");

    const {
        data: analyticsData,
        fn: analyticsFn,
        loading: analyticsLoading
    } = useFetch(getAnalytics);

    useEffect(() => {
        analyticsFn(period);
    }, [period])

    useEffect(() => {
        if (analyticsData && !analyticsLoading) {
            console.log(analyticsData);
        }
    }, [analyticsData, analyticsLoading])


    return (
        <div className='relative'>
            <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className={`w-fit sm:w-64 h-12 absolute -top-12 right-0 bg-gray-100 backdrop-blur border border-orange-500`}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="15d">Last 15 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
            </Select>

            {analyticsLoading
                ? <AnalyticsLoadingSkeleton />
                : <div>
                    <div className="overall-stats grid grid-cols-6 gap-4">
                        <div className="total-entries col-span-3 lg:col-span-2 shadow shadow-gray-400 bg-gray-100 h-24 rounded-lg flex flex-col items-center justify-end p-2 sm:p-4 gap-1">
                            <span className='md:text-lg text-gray-600'>Total Entries</span>
                            <span className='flex items-end'>
                                <span className='text-2xl lg:text-4xl text-amber-700'>{analyticsData?.data.overallStats.totalEntries}</span>
                                <span className='text-xs m-1 text-gray-500'>in past {period=="7d" ? "7" : period=="15d" ? "15" : "30"} days</span>    
                            </span>    
                        </div>
                        <div className="total-score col-span-3 lg:col-span-2 shadow shadow-gray-400 bg-gray-100 h-24 rounded-lg flex flex-col items-center justify-end p-2 sm:p-4 gap-1"><span className='md:text-lg text-gray-600'>Avg. Mood Score</span><span className='text-2xl lg:text-4xl text-amber-700' >{analyticsData?.data.overallStats.totalEntries===0 ? "0" : analyticsData?.data.overallStats.avgMoodScore }/10</span></div>
                        <div className="total-score col-span-6 lg:col-span-2 shadow shadow-gray-400 bg-gray-100 h-24 rounded-lg flex flex-col items-center justify-center p-2 sm:p-4 gap-1">
                            {analyticsData?.data.overallStats.totalEntries===0
                            ? <span className='text-gray-500 text-lg'>🖋️Add entries to get mood trends.</span>
                            : <div className='w-full h-full flex flex-col items-center gap-1'>
                                <span className='text-lg md:text-2xl text-amber-700'>{getMoodById(analyticsData?.data.overallStats.mostFrequentMood)?.emoji}<span className='text-sm text-gray-500 px-1 pl-3'>Frequently</span>{analyticsData?.data.overallStats.mostFrequentMood} </span>
                            <span className='text-sm lg:text-lg text-gray-600' >{getMoodTrend(analyticsData?.data.overallStats.avgMoodScore)}</span>
                            </div>    
                        }
                        </div>
                    </div>
                    <div className="chart min-h-40 w-full shadow shadow-gray-400 bg-gray-100 my-4 rounded-lg"></div>
                </div>}
        </div>
    )
}

export default MoodAnalytics