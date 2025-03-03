import React from 'react'
import { useParams } from 'react-router-dom'

export default function User() {
    const {userid}= useParams()

    return (
        <>
           <div className="bg-red-500 text-white text-4xl p-3">User : {userid}</div> 
        </>
    )
}
