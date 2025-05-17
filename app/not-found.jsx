"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FileQuestion, ShieldQuestion } from 'lucide-react'

const NotFoundPage = () => {
    const router = useRouter()
  return (
    <div className='h-screen w-full flex flex-col gap-4 items-center justify-center'>
        <h2 className='text-5xl text-orange-800/60 font-black'>404 - Not found</h2>
        <p className='text-xl font-semibold text-orange-900/50'>Page you are looking for either doesn't exit or have been moved!</p>
        <Button className="text-lg" variant="journal" onClick={() => router.push("/dashboard")}>Return to Dashboard</Button>
    </div>
  )
}

export default NotFoundPage