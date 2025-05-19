import { useState } from "react";

// a custom hook to handle all states related to asynchronous data feching
    // we give the hook a function (cb) so it knows what to run.
    // The hook gives back the fn, which is the safe executor of that function — with loading/error/data state wrapped around it.
    // we call fn() when you want, passing any arguments.
    // The hook does all the state-handling work like data, loading, error.

export default function useFetch(cb) {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fn(...args) {
        setLoading(true);
        setError(null)
        try {
            const response = await cb(...args)  // call the server action, with the provided args, set the data to the state
            setData(response)
            setError(null)
        } catch (error) {
            console.error("Complete Log of ERRRRR  : ",error);
            
            setError(error)
        }finally{
            setLoading(false)
        }
    }
    
    return {data, setData, loading, error, fn}
}