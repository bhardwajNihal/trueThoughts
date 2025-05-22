"use client"
import { getAnalytics } from '@/actions/getAnalyticsData'
import useFetch from '@/app/hooks/useFetch'
import React, { useEffect } from 'react'
import AnalyticsLoadingSkeleton from './AnalyticsLoadingSkeleton'

const MoodAnalytics = () => {

    const {
        data : analyticsData,
        fn : analyticsFn,
        loading : analyticsLoading 
    }  = useFetch(getAnalytics);

    useEffect(() => {
        analyticsFn("7d");
    },[])

    useEffect(() => {
        if(analyticsData && !analyticsLoading){
            console.log(analyticsData);
        }
    },[analyticsData,analyticsLoading])

    if(!analyticsLoading) return <AnalyticsLoadingSkeleton />

  return (
    <div>MoodAnalytics</div>
  )
}

export default MoodAnalytics