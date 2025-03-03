import React,{useEffect, useState} from 'react'
import {useLoaderData} from 'react-router-dom'

export default function Github() {
    const [data, setData] = useState([])
    useEffect(()=> {
        fetch('https://api.github.com/users/hiteshchoudhary')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setData(data)

        })
    }, [])

    return (
        <>
           <div className="bg-red-500 text-white text-4xl p-3">
            Github Followers :{data.followers}
            <img src={data.avatar_url}
            alt="git pic" 
            width={300}/>
            </div> 
        </>
    )
}

export const githubInfoLoader = async () =>{
    const response = await fetch('https://api.github.com/users/hiteshchoudhary');
    return response.json()
}
