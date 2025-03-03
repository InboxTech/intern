import { useState } from 'react'

import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {

  return (
    <>
     
       <h1 className="text-2xl font-bold text-black text-center  py-3 ">Learn about Redux-Toolkit</h1> 
       <AddTodo/>
       <Todos/>
    </>
  )
}

export default App
